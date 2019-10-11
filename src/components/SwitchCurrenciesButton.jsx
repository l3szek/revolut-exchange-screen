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
    height: 40,
    width: 40,
    paddingLeft: 6,
    paddingTop: 6,
    zIndex: 100,
    cursor: 'pointer',
    position: 'absolute',
    bottom: -20,
    background: mainTheme.colors.white
  },
}));

const SwitchCurrenciesButton = (props: Props) => { 
  const { onCurrencySwitch } = props;
  const classes = useStyles();
  return (
    <a
      type="button"
      tabIndex={0}
      onClick={onCurrencySwitch}
      className={classes.switchBtn}
    >
      <Icon color="primary">
        import_export
      </Icon>
    </a>
  )
}

export default SwitchCurrenciesButton;