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

export const getLatestRatessForCurrency = (currencyCode) => (dispatch: Dispatch) => {
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

export const getRatesForAllCurrencies = () =>
  (dispatch: Dispatch, getState: () => AppState): void => { 
    const state = getState();
    const { userWallet } = state.wallet;
    userWallet.forEach(item =>
      dispatch(getLatestRatessForCurrency(item.currency))
    );
  }

export const selectAmountFrom = (amount) =>
  (dispatch: Dispatch, getState: () => AppState): void => {
    if (amount === '' || amount === 0) {
      // reset the amountTo as well
      dispatch({
        type: types.SELECT_AMOUNT_TO,
        amount,
      });
    }
    dispatch({
      type: types.SELECT_AMOUNT_FROM,
      amount: amount
    })
  }