// @flow
import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

import { useInterval } from './utils/useInterval';
import { fetchUserWallet, getRatesForAllCurrencies } from './actions/actions';

import CalculatorScreen from './components/CalculatorScreen';

import type { Dispatch } from './constants/common';

type Props = {
  getUserWallet: Function,
  getAllCurrencyRates: Function,
}

const useStyles = makeStyles(theme => ({
  title: {
    padding: 20,
  },
  container: {
    marginTop: 20,
    marginBottom: 20,
    background: '#FFFFFF',
    borderRadius: 4,
    paddingLeft: 0,
    paddingRight: 0,
  },
}));

const App = (props: Props) => {
  const { getUserWallet, getAllCurrencyRates } = props;
  const classes = useStyles();

  useEffect(() => {
    getUserWallet();
  }, [getUserWallet]);
  
  useInterval(() => {
    getAllCurrencyRates();
  }, 10000);

  return (
    <Fragment>
      <CssBaseline />
      <Container className={classes.container} maxWidth="sm">
        <Grid>
          <Typography className={classes.title} variant="h5">Exchange</Typography>
        </Grid>
        <CalculatorScreen />
      </Container>
    </Fragment>
  );
}

const mapDispatchToProps = (dispatch: Dispatch): $Shape<Props> => ({
  getUserWallet: () => {
    dispatch(fetchUserWallet())
      .then(() => dispatch(getRatesForAllCurrencies()));
  },
  getAllCurrencyRates: () => dispatch(getRatesForAllCurrencies()),
});

export default connect(
  null,
  mapDispatchToProps,
)(App);