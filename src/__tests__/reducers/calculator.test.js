import { types } from '../../actions/actionTypes';
import calculatorReducer from '../../reducers/calculator';
import wallet from '../../utils/userWalletMock.json';
import { CURRENCY } from '../../constants/common';

describe('calculator reducer', () => {
  it('should return the initial state', () => {
    expect(calculatorReducer(undefined, {})).toEqual(
      {
        currencyFrom: '',
        currencyTo: '',
        amountFrom: '',
        amountTo: '',
      })
  })

  it('should handle FETCHING_WALLET_SUCCESS', () => {
    const userDefaultCurrency = CURRENCY.GBP;
    const defaultCurrency = CURRENCY.EUR;
    expect(
      calculatorReducer([], {
        type: types.FETCHING_WALLET_SUCCESS,
        userDetails: wallet
      })
    ).toEqual(
      {
        currencyFrom: userDefaultCurrency, currencyTo: defaultCurrency
      })
  })

})