// @flow

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

type Props = {
  currencies: Array<any>,
  classeNames: string,
  onCurrencyChange: SyntheticInputEvent<*> => any,
  currency: string,
}

const useStyles = makeStyles(theme => ({
  menu: {
    width: 150,
  },
}));

const CurrencySelect = (props: Props) => { 
  const { currencies, classeNames, onCurrencyChange, currency } = props;
  const classes = useStyles();
  const mappedCurrencies =
    currencies.map(option => (
      <MenuItem key={option.currency} value={option.currency}>
        {option.currency}
      </MenuItem>
    ));
  return (
    <TextField
      id="standard-select-currency"
      select
      className={`${classeNames} ${classes.menu}`}
      value={currency}
      onChange={(e) => onCurrencyChange(e)}
      SelectProps={{
        MenuProps: {
          className: classes.menu,
        },
      }}
      margin="normal"
    >
      {mappedCurrencies}
    </TextField>
  )
}

export default CurrencySelect;