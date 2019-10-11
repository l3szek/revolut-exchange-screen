// @flow

import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

type Props = {

}

const useStyles = makeStyles(theme => ({
  menu: {
    width: 150,
  },
}));

const CurrencySelect = (props: Props) => { 
  const { currencies, classeNames } = props;
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
      // label="Select"
      className={`${classeNames} ${classes.menu}`}
      value="EUR"
      // onChange={handleChange('currency')}
      SelectProps={{
        MenuProps: {
          className: classes.menu,
        },
      }}
      helperText="Please select your currency"
      margin="normal"
    >
      {mappedCurrencies}
    </TextField>
  )
}

export default CurrencySelect;