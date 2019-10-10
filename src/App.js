// @flow
import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { useInterval } from './utils/useInterval';
import { fetchUserWallet, getRatesForAllCurrencies } from './actions/actions';

import type { AppState } from './reducers/rootReducer';
import type { Dispatch } from './constants/common';

type Props = {
  userWallet: Array<any>,
  getUserWallet: Function,
  getAllCurrencyRates: Function,
}

const App = (props: Props) => {
  const { userWallet, getUserWallet, getAllCurrencyRates } = props;

  useEffect(() => {
    getUserWallet();
  }, [getUserWallet]);
  
  useInterval(() => {
    getAllCurrencyRates();
  }, 10000);

  return (
    <div>
      <h1>Revolut exchange </h1>
      {userWallet.map(item => item.currency)}
    </div>
  );
}


const mapStateToProps = (state: AppState): $Shape<Props> => ({
  userWallet: state.wallet.userWallet
});

const mapDispatchToProps = (dispatch: Dispatch): $Shape<Props> => ({
  getUserWallet: () => {
    dispatch(fetchUserWallet())
      .then(() => dispatch(getRatesForAllCurrencies()));
  },
  getAllCurrencyRates: () => dispatch(getRatesForAllCurrencies())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);