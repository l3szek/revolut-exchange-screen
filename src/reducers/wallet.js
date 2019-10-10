// @flow
import { types } from '../actions/actionTypes';

export type WalletState = {
  userWallet: Array<Object>,
  defaultCurrency: string,
  userDefaultCurrency: string,
};

const initialState = {
  userWallet: [],
  defaultCurrency: '',
  userDefaultCurrency: '',
};

export default (state: WalletState = { ...initialState }, action: Object) => {
  switch (action.type) {
    
    case types.FETCHING_WALLET_SUCCESS: {  
      const { defaultCurrency, userWallet, userDefaultCurrency } = action.userDetails;
      return { ...state, userDefaultCurrency, defaultCurrency, userWallet }
    };
      
    default:
      return state;
  }
};