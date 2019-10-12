// @flow

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { formattedAmount } from '../utils/helpers';

import { theme as mainTheme } from '../utils/theme';

type Props = {
  symbol: string,
  rate: number| null,
  currencyTo: string,
}

const useStyles = makeStyles(theme => ({
  rate: {
    display: 'flex',
    border: `2px solid ${mainTheme.colors.grey}`,
    borderRadius: 25,
    width: 'auto',
    padding: '7px 10px 4px 10px',
    zIndex: 100,
    position: 'absolute',
    bottom: -20,
    left: '50%',
    marginLeft: -82,
    background: theme.palette.common.white
  },
}));

const ExchangeRateInfo = (props: Props) => { 
  const { symbol, rate, currencyTo } = props;
  const classes = useStyles();
  const amountFormatted = formattedAmount(rate);
  return (
    <Box className={classes.rate}>
      <Icon color="primary">
        show_chart
      </Icon>
      <Typography color="primary" variant="body2">
        1 {symbol} = {amountFormatted} {currencyTo}
      </Typography>
    </Box>
  )
}

export default ExchangeRateInfo;