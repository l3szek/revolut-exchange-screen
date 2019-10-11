// @flow

import React, {Fragment} from 'react';
import Typography from '@material-ui/core/Typography';

import { formattedAmount } from '../utils/helpers';

type Props = {
  symbol: string,
  availableMoney: number,
}

const AvailableCurrency = (props: Props) => { 
  const { symbol, availableMoney } = props;
  const amount = formattedAmount(availableMoney);
  return (
    <Fragment>
      <Typography
        variant="subtitle2"
        color="textSecondary"
      >
        Balance:
      </Typography>
      <Typography
        variant="subtitle1"
        color="textSecondary"
      >
        {symbol} {amount}
      </Typography>
    </Fragment>
  )
}

export default AvailableCurrency;