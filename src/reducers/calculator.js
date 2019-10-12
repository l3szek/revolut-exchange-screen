// @flow
import { types } from '../actions/actionTypes';

export type CalculatorState = {
  currencyFrom: string,
  currencyTo: string,
  amountFrom: number,
  amountTo: number,
};

const initialState = {
  currencyFrom: '',
  currencyTo: '',
  amountFrom: '',
  amountTo: '',
};

export default (state: CalculatorState = { ...initialState }, action: Object) => {
  switch (action.type) {
    
    case types.FETCHING_WALLET_SUCCESS: {  
      const { defaultCurrency, userDefaultCurrency } = action.userDetails;
      return { ...state, currencyFrom: userDefaultCurrency, currencyTo: defaultCurrency,}
    };

    case types.SET_CURRENCY_FROM:
      return { ...state, currencyFrom: action.currency };   
    
    case types.SET_CURRENCY_TO:
      return { ...state, currencyTo: action.currency };  
      
    case types.SELECT_AMOUNT_FROM:
      return { ...state, amountFrom: action.amount };   
    
    case types.SELECT_AMOUNT_TO:
      return { ...state, amountTo: action.amount };
      
    default:
      return state;
  }
};