// @flow
import { types } from '../actions/actionTypes';

export type ModalsState = {
  confirmationModalActive: boolean,
};

const initialState = {
  confirmationModalActive: false,
};

export default (state: ModalsState = { ...initialState }, action: Object) => {
  switch (action.type) {
    
    case types.TOGGLE_CONFIRMATION_MODAL:
      return { confirmationModalActive: action.showModal };
      
    default:
      return state;
  }
};