// @flow

import React, {Fragment} from 'react';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import { onCurrencyChange, selectAmount, switchCurrencies, exchangeMoney } from '../actions/actions';
import { theme as mainTheme } from '../utils/theme';
import CalculatorInput from './CalculatorInput';
import SwitchCurrenciesButton from './SwitchCurrenciesButton';
import ExchangeRateInfo from './ExchangeRateInfo';
import ExchangeButton from './ExchangeButton';

import type { AppState } from './reducers/rootReducer';
import type { Dispatch } from './constants/common';

type Props = {
  userWallet: Array<any>,
  classeNames: string,
  onCurrencyChange: SyntheticInputEvent<*> => any,
  onChangeAmount: SyntheticInputEvent<*> => any,
  selectedCurrencyFrom: Object,
  selectedCurrencyTo: Object,
  amountFrom: number | string,
  amountTo: number | string,
  currencyFrom: string,
  currencyTo: string,
  onCurrencySwitch: Function,
  rate: number | null,
  disabledExchangeBtn: boolean,
  onExchangeBtnClick: Function,
  notEnoughFunds: boolean,
}

const useStyles = makeStyles(theme => ({
  firstInput: {
    position: 'relative',
    paddingTop: 0,
  },
  secondInput: {
    background: mainTheme.colors.grey,
  },
  padding: {
    padding: theme.spacing(2.5),
    paddingBottom: theme.spacing(5),
  }
}));

const ExchangeScreen = (props: Props) => { 
  const { userWallet, onChangeAmount, amountFrom, onCurrencyChange, currencyFrom,
    selectedCurrencyFrom, selectedCurrencyTo, currencyTo, amountTo, onCurrencySwitch,
    rate, disabledExchangeBtn, onExchangeBtnClick, notEnoughFunds } = props;
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
          notEnoughFunds={notEnoughFunds}
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

        <ExchangeButton
          disabled={disabledExchangeBtn}
          onClick={onExchangeBtnClick}
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
  const checkAmount = amountFrom === 0 || amountFrom.length === 0 || amountFrom === '0' || amountFrom === '0.00' || amountFrom === '0.0';
  const notEnoughFunds = amountFrom > selectedCurrencyFrom.availableMoney;
  const disabledExchangeBtn = notEnoughFunds || checkAmount;
  
  return {
    userWallet,
    currencyFrom,
    amountFrom,
    currencyTo,
    amountTo,
    selectedCurrencyFrom,
    selectedCurrencyTo,
    rate,
    disabledExchangeBtn,
    notEnoughFunds,
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
    dispatch(switchCurrencies());
  },
  onExchangeBtnClick: () => { 
    dispatch(exchangeMoney());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ExchangeScreen);