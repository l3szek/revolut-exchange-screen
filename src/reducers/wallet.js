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
    
    case types.UPDATE_WALLET: {
      const { currency, amount, userWallet } = action;
      const updatedWallet = userWallet.map(item => {
        if (item.currency === currency) {
          item.availableMoney = amount
        }
        return item;
      });
      return { ...state, userWallet: updatedWallet }
    }
      
    default:
      return state;
  }
};