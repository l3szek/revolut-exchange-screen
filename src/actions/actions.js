import { types } from './actionTypes';
import axios from 'axios';

export const fetchUserWallet = () => (dispatch) => {
  dispatch({type: types.FETCHING_WALLET_START});
  // in real-life scenario, the below would make an API call to fetch the user's wallet
  // for the purpose of this app, I have created a mock of user wallet in a JSON file
  axios.get('/utils/userWalletMock.json')
    .then(function (response) {
      dispatch({
        type: types.FETCHING_WALLET_SUCCESS,
        userDetails: response.data
      });
  })
  .catch(function (error) {
    console.log(error);
  });
}