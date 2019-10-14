import { types } from '../../actions/actionTypes';
import currenciesReducer from '../../reducers/currencies';
import latestEUR from '../actions/__calls__/latestEUR.json';
import { CURRENCY } from '../../constants/common';
import wallet from '../../utils/userWalletMock.json';


describe('currencies reducer', () => {
  it('should return the initial state', () => {
    expect(currenciesReducer(undefined, {})).toEqual(
      {
        fetchingExchangeRates: false,
        rates: [],
      })
  })

  it('should handle FETCHING_WALLET_SUCCESS', () => {
    const userDetails = { ...wallet };
    const updatedRates = [
      { currency: CURRENCY.EUR },
      { currency: CURRENCY.GBP },
      { currency: CURRENCY.USD },
      { currency: CURRENCY.PLN },
    ]
    expect(
      currenciesReducer({}, {
        type: types.FETCHING_WALLET_SUCCESS,
        userDetails,
      })
    ).toEqual(
      {
        rates: updatedRates
      })
  })

  it('should handle FETCHING_EXCHANGE_RATES_SUCCESS', () => {
    const currency = CURRENCY.EUR;
    const response = latestEUR.rates
    const updatedRates = [{ currency: currency, rates: response }]
    expect(
      currenciesReducer({
        rates: [{ currency }]
      }, {
        type: types.FETCHING_EXCHANGE_RATES_SUCCESS,
        currency,
        response
      })
    ).toEqual(
      {
        fetchingExchangeRates: false,
        rates: updatedRates
      })
  })

})