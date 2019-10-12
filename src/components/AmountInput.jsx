// @flow
import React, { useEffect, useState  } from 'react';
import { getFormattedValue } from '../utils/helpers';
import { KEYCODES } from '../constants/common';
import TextField from '@material-ui/core/TextField';

import { formattedAmount } from '../utils/helpers';

type Props = {
  onChangeAmount: Function,
  currentValue: string | number,
  onFocus?: Function,
  classes?: string,
  autoFocus?: boolean,
}

const AmountInput = (props: Props) => {
  const { classes, autoFocus, currentValue, onChangeAmount } = props;
  const initialValue = currentValue > 0 ? currentValue : '';
  const getStateWithFormattedValue = (currValue: number | string) => getFormattedValue(currValue);

  const [value, setValue] = useState(initialValue);
  const [focused, setFocued] = useState(false);

  useEffect(() => {
    setValue(getStateWithFormattedValue(currentValue))
  }, [currentValue]);

  const onKeyDown = (event: SyntheticInputEvent<HTMLInputElement>) => {
    const target = event.currentTarget;
    if (event.keyCode === KEYCODES.ENTER) {
      target.blur();
    }
  };

  const onChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    const val = event.target.value;
    const newState = getStateWithFormattedValue(val);
    if (newState !== value) {
      onChangeAmount(newState);
    }
    setValue(newState);
  }

  const amountFormatted = formattedAmount(value);
  const pattern = '[0-9.]*';

  const attributes = {
    autoCapitalize: 'off',
    autoComplete: 'off',
    autoCorrect: 'off',
    className: classes,
    onKeyDown,
    onChange: (e) => onChange(e),
    onFocus: () => setFocued(true),
    onBlur: () =>  setFocued(false),
    pattern,
    spellCheck: 'false',
    type: 'text',
    value: focused ? value : amountFormatted,
  };
  
  return (
    <TextField
        id="s-bssare"
        className={classes}
        margin="normal"
        inputProps={{ 'aria-label': 'amount-input' }}
        {...attributes}
        autoFocus={autoFocus}
    />
  );
}

export default AmountInput;