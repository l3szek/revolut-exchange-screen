import axios from 'axios';
import { types } from './actionTypes';

import type { AppState } from '../reducers/rootReducer';
import type { Dispatch } from '../constants/common';

export const fetchUserWallet = () => (dispatch: Dispatch) => {
  dispatch({type: types.FETCHING_WALLET_START});
  // in real-life scenario, the below would make an API call to fetch the user's wallet
  // for the purpose of this app, I have created a mock of user wallet in a JSON file
  return axios.get('/utils/userWalletMock.json')
  .then(function (response) {
    dispatch({
      type: types.FETCHING_WALLET_SUCCESS,
      userDetails: response.data
    });
  })
  .catch(function (error) {
    console.log(error);
  });
}

export const getLatestRatessForCurrency = (currencyCode: string) => (dispatch: Dispatch) => {
  dispatch({
    type: types.FETCHING_EXCHANGE_RATES_START,
    currency: currencyCode,
  });
  return axios.get('https://api.exchangeratesapi.io/latest', {
    params: {
      base: currencyCode
    }
  })
  .then(function (response) {
    dispatch({
      type: types.FETCHING_EXCHANGE_RATES_SUCCESS,
      currency: currencyCode,
      response: response.data.rates
    })
  })
  .catch(function (error) {
    console.log(error);
  })
}

export const calculateInput = (calculateAmountFrom?: boolean) =>
  (dispatch: Dispatch, getState: () => AppState): void => { 
    const state = getState();
    const { calculator, currencies } = state;
    const { currencyFrom, currencyTo, amountFrom, amountTo } = calculator;
    const { rates } = currencies;
    const currencyFromRates = rates.find(item => item.currency === currencyFrom).rates;
    const currencyFromExchangeRate = currencyFromRates[currencyTo];
    const amountToExchanged = amountFrom * currencyFromExchangeRate;
    const amountFromExchanged = amountTo / currencyFromExchangeRate;
    if (calculateAmountFrom) {
      dispatch({
        type: types.SELECT_AMOUNT_TO,
        amount: amountToExchanged,
      });
    } else {
      dispatch({
        type: types.SELECT_AMOUNT_FROM,
        amount: amountFromExchanged,
      });
    }
  }

export const getRatesForAllCurrencies = () =>
  (dispatch: Dispatch, getState: () => AppState): void => { 
    const state = getState();
    const { wallet, calculator } = state;
    const { userWallet } = wallet;
    const { amountFrom, amountTo } = calculator;
    userWallet.forEach(item =>
      dispatch(getLatestRatessForCurrency(item.currency))
    );
    if (amountFrom > 0 || amountTo > 0) {
      dispatch(calculateInput(true));
    }
  }  

export const selectAmount = (amount: number, selectAmuntTo?: boolean) =>
  (dispatch: Dispatch): void => {
    if (amount === '' || amount === 0) {
      dispatch({
        type: selectAmuntTo ? types.SELECT_AMOUNT_FROM : types.SELECT_AMOUNT_TO,
        amount,
      });
    }
    dispatch({
      type: selectAmuntTo ? types.SELECT_AMOUNT_TO : types.SELECT_AMOUNT_FROM,
      amount: amount
    })

    if (!selectAmuntTo) {
      dispatch(calculateInput(true))
    } else {
      dispatch(calculateInput())
    }
  }

export const onCurrencyChange = (currency: number, changeCurrencyTo?: boolean) =>
  (dispatch: Dispatch, getState: () => AppState): void => { 
    const state = getState();
    const { currencyFrom, currencyTo } = state.calculator;
    if (!changeCurrencyTo && currency === currencyTo) {
      dispatch({
        type: types.SET_CURRENCY_TO,
        currency: currencyFrom,
      });
    }
    if (changeCurrencyTo && currency === currencyFrom) {
      dispatch({
        type: types.SET_CURRENCY_FROM,
        currency: currencyTo,
      });
    }
    dispatch({
      type: changeCurrencyTo ? types.SET_CURRENCY_TO : types.SET_CURRENCY_FROM,
      currency,
    });
    if (changeCurrencyTo) {
      dispatch(calculateInput())
    } else {
      dispatch(calculateInput(true))
    }
  }

export const switchCurrencies = () =>
  (dispatch: Dispatch, getState: () => AppState): void => { 
    const state = getState();
    const { currencyFrom, currencyTo, amountTo } = state.calculator;
    dispatch({
      type: types.SET_CURRENCY_TO,
      currency: currencyFrom,
    });
    dispatch({
      type: types.SET_CURRENCY_FROM,
      currency: currencyTo,
    });
    dispatch({
      type: types.SELECT_AMOUNT_FROM,
      amount: amountTo,
    });

    dispatch(calculateInput(true));
  }

export const updateWallet = (currency: string, amount: string | number) =>
  (dispatch: Dispatch): void => { 
    dispatch({
      type: types.UPDATE_WALLET,
      currency,
      amount,
    });
  }

export const exchangeMoney = () =>
  (dispatch: Dispatch, getState: () => AppState): void => { 
    const state = getState();
    const { wallet, calculator } = state;
    const { currencyFrom, currencyTo, amountFrom, amountTo } = calculator;
    const currencyFromWallet = wallet.userWallet.find(item => item.currency === currencyFrom).availableMoney;
    const currencyToWallet = wallet.userWallet.find(item => item.currency === currencyTo).availableMoney;
    const newCurrencyFromWalletVal = currencyFromWallet - amountFrom;
    const newCurrencyToWalletVal = currencyToWallet + amountTo;

    if (amountFrom > currencyFromWallet) {
      return null;
    }
    dispatch(updateWallet(currencyFrom, newCurrencyFromWalletVal));
    dispatch(updateWallet(currencyTo, newCurrencyToWalletVal));
  }