// @flow

import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import AmountInput from './AmountInput';
import CurrencySelect from './CurrencySelect';
import AvailableCurrency from './AvailableCurrency';

type Props = {
  userWallet: Array<any>,
  onCurrencyChange: SyntheticInputEvent<*> => any,
  currency: string,
  onChangeAmount: SyntheticInputEvent<*> => any,
  currentValue: string | number,
  selectedCurrency: Object,
  autoFocus?: boolean,
}

const useStyles = makeStyles(theme => ({
  marginTop20: {
    marginTop: 20,
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
  textField: {
    '& .MuiInput-formControl': {
      fontSize: 40,
    }
  },
  amountInput: {
    maxWidth: 320,
    '& .MuiInput-input': {
      textAlign: 'right',
    }
  }
}));

const CalculatorInput = (props: Props) => { 
  const { userWallet, onChangeAmount, onCurrencyChange, currency, selectedCurrency, currentValue, autoFocus } = props;
  const classes = useStyles();
  return (
    <Grid container justify="space-between" spacing={1}>
      <Grid item>
        <CurrencySelect
          currencies={userWallet}
          classeNames={classes.textField}
          onCurrencyChange={onCurrencyChange}
          currency={currency}
        />
        <Grid classes={classes.marginTop10} item>
          <AvailableCurrency
            symbol={selectedCurrency.symbol}
            availableMoney={selectedCurrency.availableMoney}
          />
        </Grid>
      </Grid>
      <Grid item>
        <AmountInput
          onChangeAmount={onChangeAmount}
          currentValue={currentValue}
          classes={`${classes.textField} ${classes.amountInput}`}
          autoFocus={autoFocus}
        />
      </Grid>
    </Grid> 
  )
}

export default CalculatorInput;