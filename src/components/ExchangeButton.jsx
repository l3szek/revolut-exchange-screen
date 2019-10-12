// @flow

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';

const useStyles = makeStyles(theme => ({
  grid: {
    marginTop: theme.spacing(2.5),
  },
  fab: {
    margin: theme.spacing(1),
    paddingLeft: '15%',
    paddingRight: '15%',
  },
}));

type Props = {
  onClick: Function,
  disabled: boolean,
}

const ExchangeButton = (props: Props) => { 
  const { onClick, disabled } = props;
  const classes = useStyles();
  return (
    <Grid
      container
      justify="center"
      className={classes.grid}
    >
      <Fab 
        variant="extended"
        color="secondary"
        aria-label="exchange"
        className={classes.fab}
        onClick={onClick}
        disabled={disabled}
      >
        Exchange
      </Fab >
    </Grid>
  )
}

export default ExchangeButton;