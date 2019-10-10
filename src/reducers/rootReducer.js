// @flow
import { combineReducers } from 'redux';
import wallet from './wallet';
import calculator from './calculator';
import currencies from './currencies';

import type { WalletState } from './wallet';
import type { CalculatorState } from './calculator';
import type { CurrenciesState } from './currencies';

export type AppState = {
  wallet: WalletState,
  calculator: CalculatorState,
  currencies: CurrenciesState
}

const rootReducer: AppState = combineReducers({
  wallet,
  calculator,
  currencies,
});

export default rootReducer;