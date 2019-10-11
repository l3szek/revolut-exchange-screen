// @flow
import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';

import { useInterval } from './utils/useInterval';
import { fetchUserWallet, getRatesForAllCurrencies, selectAmountFrom } from './actions/actions';

import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import CalculatorInput from './components/CalculatorInput';

import type { AppState } from './reducers/rootReducer';
import type { Dispatch } from './constants/common';

type Props = {
  userWallet: Array<any>,
  getUserWallet: Function,
  getAllCurrencyRates: Function,
  onChangeAmount: Function,
  currentValue: string,
}

const App = (props: Props) => {
  const { userWallet, getUserWallet, getAllCurrencyRates, onChangeAmount, currentValue } = props;

  useEffect(() => {
    getUserWallet();
  }, [getUserWallet]);
  
  useInterval(() => {
    getAllCurrencyRates();
  }, 10000);

  return (
    <Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <h1>Revolut exchange </h1>
        <CalculatorInput
          onChangeAmount={onChangeAmount}
          currentValue={currentValue}
          currencies={userWallet}
        />
      </Container>
    </Fragment>
  );
}


const mapStateToProps = (state: AppState): $Shape<Props> => ({
  userWallet: state.wallet.userWallet,
  currentValue: state.calculator.amountFrom
});

const mapDispatchToProps = (dispatch: Dispatch): $Shape<Props> => ({
  getUserWallet: () => {
    dispatch(fetchUserWallet())
      .then(() => dispatch(getRatesForAllCurrencies()));
  },
  getAllCurrencyRates: () => dispatch(getRatesForAllCurrencies()),
  onChangeAmount: (e: SyntheticInputEvent<HTMLInputElement>) => {
    console.log('on amount change: '+ e.target.value);
    dispatch(selectAmountFrom(e.target.value));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);