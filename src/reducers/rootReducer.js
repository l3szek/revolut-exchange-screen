// @flow
import { combineReducers } from 'redux';
import wallet from './wallet';
import calculator from './calculator';
import currencies from './currencies';
import modals from './modals';

import type { WalletState } from './wallet';
import type { CalculatorState } from './calculator';
import type { CurrenciesState } from './currencies';
import type { ModalsState } from './modals';

export type AppState = {
  wallet: WalletState,
  calculator: CalculatorState,
  currencies: CurrenciesState,
  modals: ModalsState,
}

const rootReducer: AppState = combineReducers({
  wallet,
  calculator,
  currencies,
  modals,
});

export default rootReducer;