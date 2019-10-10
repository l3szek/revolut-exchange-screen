// @flow
import { types } from '../actions/actionTypes';

export type CurrenciesState = {
  fetchingExchangeRates: boolean,
  rates: Array<Object>
};

const initialState = {
  fetchingExchangeRates: false,
  rates: [],
};

export default (state: CurrenciesState = { ...initialState }, action: Object) => {
  switch (action.type) {

    case types.FETCHING_WALLET_SUCCESS: {  
      const { userWallet } = action.userDetails;
      const newRates = userWallet.map(item => {
        return {currency: item.currency}
      })
      return { ...state, rates: [...newRates] }
    };

    case types.FETCHING_EXCHANGE_RATES_START:
      return { ...state, fetchingExchangeRates: true };
    
    case types.FETCHING_EXCHANGE_RATES_SUCCESS: 
      const { currency, response } = action;
      const { rates } = state;
      const updatedRates = [...rates.map(item => {
        if (item.currency === currency) {
          item.rates = response;
        }
        return item;
      })];
      return {
        ...state,
        fetchingExchangeRates: false,
        rates: updatedRates
      };
      
    default:
      return state;
  }
};