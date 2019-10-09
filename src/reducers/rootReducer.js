// @flow
import { types } from '../actions/actionTypes';

export type AppState = {
  fetchingExchangeRates: boolean,
  userWallet: Array<any>,
  defaultCurrency: string,
  userDefaultCurrency: string,
  calculator: {
    currencyFrom: string,
    currencyTo: string,
  },
};

const initialState = {
  fetchingExchangeRates: false,
  userWallet: [],
  defaultCurrency: '',
  userDefaultCurrency: '',
  calculator: {
    currencyFrom: '',
    currencyTo: '',
  },
};

export default (state: AppState = { ...initialState }, action: Object) => {
  switch (action.type) {
    case types.FETCHING_EXCHANGE_RATES_START:
      return { ...state, fetchingExchangeRates: true };
    
    case types.FETCHING_EXCHANGE_RATES_SUCCESS: 
      return { ...state, fetchingExchangeRates: false };
    
    case types.FETCHING_WALLET_SUCCESS: {  
      const { defaultCurrency, userWallet, userDefaultCurrency } = action.userDetails;
      const calculator = {
        currencyFrom: userDefaultCurrency,
        currencyTo: defaultCurrency,
      }
      return { ...state, userDefaultCurrency, defaultCurrency, userWallet, calculator: calculator }
    };
      
    default:
      return state;
  }
};