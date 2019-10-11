// @flow

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import AmountInput from './AmountInput';
import CurrencySelect from './CurrencySelect';


type Props = {
  onChangeAmount: Function,
  currentValue: string | number,
}

const useStyles = makeStyles(theme => ({
  marginTop10: {
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
  width: {
    width: 300,
  }
}));

const CalculatorInput = (props: Props) => { 
  const { onChangeAmount, currentValue, currencies } = props;
  const classes = useStyles();
  return (
    <Grid container justify="space-between" spacing={1} style={{ backgroundColor: '#cfe8fc', height: '100vh' }}>
      <Grid item>
        <CurrencySelect
          currencies={currencies}
          classeNames={classes.textField}
        />
        <Grid classes={classes.marginTop10} item>
          <Typography
            variant="subtitle2"
            color="textSecondary">
            Available currency:
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            $233.24
          </Typography>
        </Grid>
      </Grid>
      <Grid item>
        <AmountInput
          onChangeAmount={onChangeAmount}
          currentValue={currentValue}
          classes={`${classes.textField} ${classes.width}`}
        />
        
      </Grid>
    </Grid> 
  )
}

export default CalculatorInput;