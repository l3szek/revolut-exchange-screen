import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { formattedAmount } from '../utils/helpers';

type Props = {
  open: Function,
  handleClose: Function,
  amountFrom: string,
  amountTo: string,
  currencyFrom: string,
  currencyTo: string,
}

const ExchangeConfirmationModal = (props: Props) => {
  const { open, handleClose, amountFrom, currencyFrom, amountTo, currencyTo } = props;
  const formattedAmountFrom = formattedAmount(amountFrom, 2);
  const formattedAmountTo = formattedAmount(amountTo, 2);
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle color="primary" id="alert-dialog-title">{"Exchange successful"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          You have successfully exchanged {currencyFrom}<strong>{formattedAmountFrom}</strong> to {currencyTo}<strong>{formattedAmountTo}</strong>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Thanks!
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ExchangeConfirmationModal;