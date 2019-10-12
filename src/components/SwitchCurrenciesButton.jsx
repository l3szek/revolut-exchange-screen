// @flow

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';

import { theme as mainTheme } from '../utils/theme';

type Props = {
  onCurrencySwitch: Function,
}

const useStyles = makeStyles(theme => ({
  switchBtn: {
    display: 'block',
    border: `2px solid ${mainTheme.colors.grey}`,
    borderRadius: '50%',
    height: theme.spacing(5),
    width: theme.spacing(5),
    paddingLeft: theme.spacing(0.75),
    paddingTop: theme.spacing(0.75),
    zIndex: 100,
    cursor: 'pointer',
    position: 'absolute',
    bottom: -theme.spacing(2.5),
    background: theme.palette.common.white
  },
}));

const SwitchCurrenciesButton = (props: Props) => { 
  const { onCurrencySwitch } = props;
  const classes = useStyles();
  return (
    <button
      onClick={onCurrencySwitch}
      className={classes.switchBtn}
    >
      <Icon color="primary">
        import_export
      </Icon>
    </button>
  )
}

export default SwitchCurrenciesButton;