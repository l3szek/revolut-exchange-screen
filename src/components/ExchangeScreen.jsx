// @flow

import React, {Fragment} from 'react';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import { onCurrencyChange, selectAmount, switchCurrencies, exchangeMoney, toggleConfirmationModal } from '../actions/actions';
import { theme as mainTheme } from '../utils/theme';
import { checkAmountFields } from '../utils/helpers';
import CalculatorInput from './CalculatorInput';
import SwitchCurrenciesButton from './SwitchCurrenciesButton';
import ExchangeRateInfo from './ExchangeRateInfo';
import ExchangeButton from './ExchangeButton';
import ExchangeConfirmationModal from './ExchangeConfirmationModal';

import type { AppState } from './reducers/rootReducer';
import type { Dispatch } from './constants/common';

type Props = {
  userWallet: Array<any>,
  classeNames: string,
  onCurrencyChange: SyntheticInputEvent<*> => any,
  onChangeAmount: Function,
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
  closeConfirmationModal: Function,
  confirmationModalActive: boolean,
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
    rate, disabledExchangeBtn, onExchangeBtnClick, notEnoughFunds, confirmationModalActive, closeConfirmationModal } = props;
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
      <ExchangeConfirmationModal
        open={confirmationModalActive}
        handleClose={closeConfirmationModal}
        amountFrom={amountFrom}
        currencyFrom={selectedCurrencyFrom.symbol}
        amountTo={amountTo}
        currencyTo={selectedCurrencyTo.symbol}
      />
    </Fragment> 
  )
}

const mapStateToProps = (state: AppState): $Shape<Props> => {
  const { calculator, wallet, currencies, modals } = state;
  const { userWallet } = wallet;
  const { rates } = currencies;
  const { currencyFrom, amountFrom, currencyTo, amountTo } = calculator;
  const availableCurrency = (currency) => userWallet.find(item => item.currency === currency);
  const selectedCurrency = (currency) => availableCurrency(currency) ? availableCurrency(currency) : { symbol: null, availableMoney: null };
  const selectedCurrencyFrom = selectedCurrency(currencyFrom);
  const selectedCurrencyTo = selectedCurrency(currencyTo);
  const ratesObj = rates.find(item => item.currency === currencyFrom);
  const rate = ratesObj && ratesObj.rates ? ratesObj.rates[currencyTo] : null;
  const checkAmountFrom = checkAmountFields(amountFrom);
  const checkAmountTo = checkAmountFields(amountTo);
  const notEnoughFunds = amountFrom > selectedCurrencyFrom.availableMoney;
  const disabledExchangeBtn = notEnoughFunds || checkAmountFrom || checkAmountTo;
  const { confirmationModalActive } = modals;
  
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
    confirmationModalActive,
  }
};

const mapDispatchToProps = (dispatch: Dispatch): $Shape<Props> => ({
  onCurrencyChange: (e: SyntheticInputEvent<HTMLInputElement>, changeCurrencyTo?: boolean) => {
    dispatch(onCurrencyChange(e.target.value, changeCurrencyTo));
  },
  onChangeAmount: (val: number, selectAmountTo?: boolean) => {
    dispatch(selectAmount(val, selectAmountTo));
  },
  onCurrencySwitch: () => {
    dispatch(switchCurrencies());
  },
  onExchangeBtnClick: () => { 
    dispatch(exchangeMoney())
      .then(() =>dispatch(toggleConfirmationModal(true)));
  },
  closeConfirmationModal: () => {
    dispatch(toggleConfirmationModal(false));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ExchangeScreen);