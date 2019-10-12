// @flow

import React, {Fragment} from 'react';
import Typography from '@material-ui/core/Typography';

import { formattedAmount } from '../utils/helpers';

type Props = {
  symbol: string,
  availableMoney: number,
  notEnoughFunds?: boolean,
}

const AvailableCurrency = (props: Props) => { 
  const { symbol, availableMoney, notEnoughFunds } = props;
  const amount = formattedAmount(availableMoney, 2);
  const typeClass = notEnoughFunds ? 'secondary' : 'textSecondary';
  return (
    <Fragment>
      <Typography
        variant="subtitle2"
        color={typeClass}
      >
        Balance: {symbol} {amount}
      </Typography>
    </Fragment>
  )
}

export default AvailableCurrency;