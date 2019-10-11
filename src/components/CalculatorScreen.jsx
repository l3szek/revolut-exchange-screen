// @flow

import React, {Fragment} from 'react';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';

import { onCurrencyChange, selectAmount, switchCurrencies } from '../actions/actions';
import { theme as mainTheme } from '../utils/theme';
import CalculatorInput from './CalculatorInput';
import SwitchCurrenciesButton from './SwitchCurrenciesButton';
import ExchangeRateInfo from './ExchangeRateInfo';

import type { AppState } from './reducers/rootReducer';
import type { Dispatch } from './constants/common';

type Props = {
  userWallet: Array<any>,
  classeNames: string,
  onCurrencyChange: SyntheticInputEvent<*> => any,
  onChangeAmount: SyntheticInputEvent<*> => any,
  selectedCurrencyFrom: Object,
  selectedCurrencyTo: Object,
  amountFrom: number,
  amountTo: number,
  currencyFrom: string,
  currencyTo: string,
  onCurrencySwitch: Function,
  rate: number | null,
}

const useStyles = makeStyles(theme => ({
  firstInput: {
    position: 'relative',
  },
  secondInput: {
    background: mainTheme.colors.grey,
  },
  padding: {
    padding: 20,
    paddingBottom: 40,
  }
}));

const CalculatorScreen = (props: Props) => { 
  const { userWallet, onChangeAmount, amountFrom, onCurrencyChange, currencyFrom,
    selectedCurrencyFrom, selectedCurrencyTo, currencyTo, amountTo, onCurrencySwitch, rate } = props;
  const classes = useStyles();

  return (
    <Fragment>
      <Grid className={`${classes.padding} ${classes.firstInput}`} item>
        <CalculatorInput
          userWallet={userWallet}
          onChangeAmount={onChangeAmount}
          onCurrencyChange={onCurrencyChange}
          currentValue={amountFrom}
          currency={currencyFrom}
          selectedCurrency={selectedCurrencyFrom}
          autoFocus
        />
        <SwitchCurrenciesButton onCurrencySwitch={onCurrencySwitch} />
        <ExchangeRateInfo
          symbol={selectedCurrencyFrom.symbol}
          rate={rate}
          currencyTo={currencyTo}
        />
      </Grid>
      <Grid className={`${classes.padding} ${classes.secondInput}`} item>
        <CalculatorInput
          userWallet={userWallet}
          onChangeAmount={(e) => onChangeAmount(e, true)}
          onCurrencyChange={(e) => onCurrencyChange(e, true)}
          currentValue={amountTo}
          currency={currencyTo}
          selectedCurrency={selectedCurrencyTo}
        />
      </Grid>

    </Fragment> 
  )
}

const mapStateToProps = (state: AppState): $Shape<Props> => {
  const { calculator, wallet, currencies } = state;
  const { userWallet } = wallet;
  const { rates } = currencies;
  const { currencyFrom, amountFrom, currencyTo, amountTo } = calculator;
  const availableCurrency = (currency) => userWallet.find(item => item.currency === currency);
  const selectedCurrency = (currency) => availableCurrency(currency) ? availableCurrency(currency) : { symbol: null, availableMoney: null };
  const selectedCurrencyFrom = selectedCurrency(currencyFrom);
  const selectedCurrencyTo = selectedCurrency(currencyTo);
  const ratesObj = rates.find(item => item.currency === currencyFrom);
  const rate = ratesObj && ratesObj.rates ? ratesObj.rates[currencyTo] : null;
  return {
    userWallet,
    currencyFrom,
    amountFrom,
    currencyTo,
    amountTo,
    selectedCurrencyFrom,
    selectedCurrencyTo,
    rate,
  }
};

const mapDispatchToProps = (dispatch: Dispatch): $Shape<Props> => ({
  onCurrencyChange: (e: SyntheticInputEvent<HTMLInputElement>, changeCurrencyTo?: boolean) => {
    dispatch(onCurrencyChange(e.target.value, changeCurrencyTo));
  },
  onChangeAmount: (e: SyntheticInputEvent<HTMLInputElement>, selectAmountTo?: boolean) => {
    dispatch(selectAmount(e.target.value, selectAmountTo));
  },
  onCurrencySwitch: () => {
    dispatch(switchCurrencies())
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CalculatorScreen);