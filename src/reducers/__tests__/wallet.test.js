import { types } from '../../actions/actionTypes';
import walletReducer from '../wallet';
import wallet from '../../utils/userWalletMock.json';
import { CURRENCY } from '../../constants/common';


describe('wallet reducer', () => {
  it('should return the initial state', () => {
    expect(walletReducer(undefined, {})).toEqual(
      {
        userWallet: [],
        defaultCurrency: '',
        userDefaultCurrency: '',
      })
  })

  it('should handle FETCHING_WALLET_SUCCESS', () => {
    expect(
      walletReducer([], {
        type: types.FETCHING_WALLET_SUCCESS,
        userDetails: wallet
      })
    ).toEqual(
      {
        ...wallet
      })
  })

  it('should handle UPDATE_WALLET', () => {
    const currency = 'USD';
    const amount = 1000;
    const userWallet = [
      {
        currency: 'USD',
        availableMoney: 5000000,
        symbol: '$'
      },
    ];
    const updatedWallet = [
      {
        currency: 'USD',
        availableMoney: amount,
        symbol: '$'
      },
    ];
    expect(
      walletReducer([], {
        type: types.UPDATE_WALLET,
        currency,
        amount,
        userWallet
      })
    ).toEqual(
      {
        userWallet: updatedWallet,
      })
  })

  

})