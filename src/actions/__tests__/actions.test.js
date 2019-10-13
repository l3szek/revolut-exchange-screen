/* eslint-disable import/namespace */
import { diff } from 'deep-object-diff';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import base from '../../utils/testsBase';
import { CURRENCY, localhost, userWalletApiMock } from '../../constants/common';
import rootReducer from '../../reducers/rootReducer';
import * as testModule from '../actions';
import { types } from '../actionTypes';

import wallet from '../../utils/userWalletMock.json';

// API responses
import latestEUR from './__calls__/latestEUR.json';
import latestGBP from './__calls__/latestGBP.json';
import latestUSD from './__calls__/latestUSD.json';
import latestPLN from './__calls__/latestPLN.json';

describe('Revolut Exchange screen App tests', () => {
  let changeLog = [];
  let actionsLog = [];

  beforeAll(() => {
    
  });

  afterAll(() => {
    base.afterAll();
  });

  beforeEach(() => {
    changeLog = [];
    actionsLog = [];

    base.beforeAll();

    base.mockApi()
    .get('/latest?base=GBP')
    .reply(
      200,
      latestGBP
    )
    .get('/latest?base=PLN')
    .reply(
      200,
      latestPLN
    )
    .get('/latest?base=USD')
    .reply(
      200,
      latestUSD
    )
    .get('/latest?base=EUR')
    .reply(
      200,
      latestEUR
    );
  
    nock(localhost)
    .get(userWalletApiMock)
    .reply(
      200,
      wallet
    );
  });

  it('should fetch user wallet', () => {
    const { store, initialState } = base.mockStore(rootReducer, changeLog, actionsLog);

    const expectedActions = [
      {
        type: types.FETCHING_WALLET_START
      },
      {
        type: types.FETCHING_WALLET_SUCCESS,
        userDetails: wallet
      },
    ];

    return store.dispatch(testModule.fetchUserWallet())
      .then(() => {
        const stateNow = store.getState();
        expect(actionsLog).toHaveLength(2);
        expect(changeLog).toHaveLength(3);
        expect(diff(changeLog[0], changeLog[1])).toMatchSnapshot('started fetching wallet');
        expect(diff(changeLog[1], changeLog[2])).toMatchSnapshot('fecthing wallet complete');
        expect(actionsLog[0]).toEqual(expectedActions[0]);
        expect(actionsLog[1]).toEqual(expectedActions[1]);
        expect(diff(initialState, stateNow)).toMatchSnapshot('state diff');
      });
  });

  it('should get latest rates for selected currency', () => {
    const { store, initialState } = base.mockStore(rootReducer, changeLog, actionsLog);
    const currencyCode = CURRENCY.EUR;

    const expectedActions = [
      {
        type: types.FETCHING_EXCHANGE_RATES_START,
        currency: currencyCode,
      },
      {
        type: types.FETCHING_EXCHANGE_RATES_SUCCESS,
        currency: currencyCode,
        response: latestEUR.rates
      },
    ];

    return store.dispatch(testModule.getLatestRatessForCurrency(currencyCode))
      .then(() => {
        const stateNow = store.getState();
        expect(actionsLog).toHaveLength(2);
        expect(changeLog).toHaveLength(3);
        expect(diff(changeLog[0], changeLog[1])).toMatchSnapshot('started fetching rates');
        expect(diff(changeLog[1], changeLog[2])).toMatchSnapshot('fecthing rates complete');
        expect(actionsLog[0]).toEqual(expectedActions[0]);
        expect(actionsLog[1]).toEqual(expectedActions[1]);
        expect(diff(initialState, stateNow)).toMatchSnapshot('state diff');
      });
  });

  it('should calculate proper amount from chosen currency', () => {
    const mockStore = configureStore([thunk]);
    const amountFrom = 100;
    const currencyFrom = CURRENCY.EUR;
    const currencyTo = CURRENCY.PLN;
    const expectedAmountTo = amountFrom * latestEUR.rates[currencyTo];
    const initialState = {
      wallet,
      calculator: {
        currencyFrom,
        currencyTo,
        amountFrom,
      },
      currencies: {
        rates: [{
          currency: currencyFrom,
          rates: latestEUR.rates
        }]
      }
    };
    const store = mockStore(initialState);

    const expectedActions = [
      {
        type: types.SELECT_AMOUNT_TO,
        amount: expectedAmountTo,
      },
    ];

    return store.dispatch(testModule.calculateInput(true))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('should fetch latest rates for currencies in user wallet', () => {
    const { store, initialState } = base.mockStore(rootReducer, changeLog, actionsLog);

    const expectedActions = [
      {
        type: types.FETCHING_WALLET_START
      },
      {
        type: types.FETCHING_WALLET_SUCCESS,
        userDetails: wallet
      },
      {
        type: types.FETCHING_EXCHANGE_RATES_START,
        currency: CURRENCY.EUR,
      },
      {
        type: types.FETCHING_EXCHANGE_RATES_START,
        currency: CURRENCY.USD,
      },
      {
        type: types.FETCHING_EXCHANGE_RATES_SUCCESS,
        currency: CURRENCY.EUR,
        response: latestEUR.rates
      },
      {
        type: types.FETCHING_EXCHANGE_RATES_SUCCESS,
        currency: CURRENCY.USD,
        response: latestUSD.rates
      },
    ];

    return store.dispatch(testModule.fetchUserWallet())
      .then(() => { 
        return store.dispatch(testModule.getRatesForAllCurrencies())
        .then(() => {
          const stateNow = store.getState();
          expect(actionsLog).toHaveLength(10);
          expect(changeLog).toHaveLength(11);
          expect(actionsLog[0]).toEqual(expectedActions[0]);
          expect(actionsLog[1]).toEqual(expectedActions[1]);
          expect(actionsLog[2]).toEqual(expectedActions[2]);
          expect(actionsLog[4]).toEqual(expectedActions[3]);
          expect(actionsLog[6]).toEqual(expectedActions[4]);
          expect(actionsLog[8]).toEqual(expectedActions[5]);
          expect(diff(initialState, stateNow)).toMatchSnapshot('state diff');
        });
      })
    
  });

  it('should set proper amount from', () => {
    const amountFrom = 4305.7;
    const amountTo = 1000;
    const currencyTo = CURRENCY.EUR;
    const currencyFrom = CURRENCY.PLN;
    const mockStore = configureStore([thunk]);
    const initialState = {
      wallet,
      calculator: {
        currencyFrom,
        currencyTo,
        amountFrom,
        amountTo,
      },
      currencies: {
        rates: [{
          currency: currencyFrom,
          rates: latestEUR.rates
        }]
      }
    };
    const store = mockStore(initialState);

    const expectedActions = [
      {
        type: types.SELECT_AMOUNT_TO,
        amount: amountTo,
      }
    ];
    return store.dispatch(testModule.selectAmount(amountTo, true))
      .then(() => {
        expect(store.getActions()[0]).toEqual(expectedActions[0]);
      });
  });
  
  it('should switch currencies (from - to) and set new amountTo', () => {
    const mockStore = configureStore([thunk]);
    const amountFrom = 100;
    const currencyFrom = CURRENCY.EUR;
    const currencyTo = CURRENCY.PLN;
    const amountTo = amountFrom * latestEUR.rates[currencyTo];
    const initialState = {
      wallet,
      calculator: {
        currencyFrom,
        currencyTo,
        amountFrom,
        amountTo,
      },
      currencies: {
        rates: [{
          currency: currencyFrom,
          rates: latestEUR.rates
        }]
      }
    };
    const store = mockStore(initialState);

    const expectedActions = [
      {
        type: types.SET_CURRENCY_TO,
        currency: currencyFrom,
      },
      {
        type: types.SET_CURRENCY_FROM,
        currency: currencyTo,
      },
      {
        type: types.SELECT_AMOUNT_FROM,
        amount: amountTo,
      }
    ];

    return store.dispatch(testModule.switchCurrencies())
      .then(() => {
        expect(store.getActions()[0]).toEqual(expectedActions[0]);
        expect(store.getActions()[1]).toEqual(expectedActions[1]);
        expect(store.getActions()[2]).toEqual(expectedActions[2]);
      });
  });

  it('should update wallet with selected amount for chosen currency', () => {
    const mockStore = configureStore([thunk]);
    const currency = CURRENCY.EUR;
    const amount = 100;
    const initialState = {wallet};
    const store = mockStore(initialState);

    const expectedActions = [
      {
        type: types.UPDATE_WALLET,
        currency,
        amount,
        userWallet: wallet.userWallet
      }
    ];

    return store.dispatch(testModule.updateWallet(currency, amount))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

});
