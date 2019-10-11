// @flow
import React from 'react';
import { focusOnContentEnd, getFormattedValue } from '../utils/helpers';
import { KEYCODES } from '../constants/common';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';


/**
 * Smart component which formats user input to look like a number (possibly with decimal part)
 */

type Props = {
  onChangeAmount: Function,
  currentValue: string | number,
  onFocus?: Function,
  focus?: boolean,
  maxWholePartLength?: number,
  maxDecimalPartLength?: number,
  name?: string,
  id?: string,
  classes?: string,
  pattern?: string,
  disabled?: boolean,
  maxLength?: string,
}

class AmountInput extends React.Component<Props> {
  constructor(props) {
    super(props);
    const initialValue = props.currentValue > 0 ? props.currentValue : '';
    this.state = this.getStateWithFormattedValue(initialValue);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currentValue !== this.props.currentValue) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState(this.getStateWithFormattedValue(this.props.currentValue));
    }
    if (this.props.focus) {
      focusOnContentEnd(this.input);
    }
  }

  onKeydown = (event) => {
    const target = event.currentTarget;
    if (event.keyCode === KEYCODES.ENTER) {
      target.blur();
    }
  };

  onChange(event) {
    const newState = this.getStateWithFormattedValue(event.target.value);

    if (newState.val !== this.state.val) {
      // user allowed to type the point on the right side, but the
      // component does not count it when giving result number outside
      const eventValue = newState.val.endsWith('.') ? newState.val.slice(0, -1) : newState.val;

      event.target.value = eventValue !== '' ? new Number(eventValue) : eventValue;
      this.props.onChangeAmount.call(this, event);
    }

    this.setState(newState);
  }

  getStateWithFormattedValue(currentValue) {
    return {
      val: getFormattedValue(currentValue, this.formatNumber, this.props.maxWholePartLength, this.props.maxDecimalPartLength),
    };
  }

  formatNumber = (value, digitsLimit = 10) => {
    const val = String(value);
    const parsedValue = val.replace(/[^\d]+/i, '');
    return parsedValue.slice(0, digitsLimit);
  }

  input: ?HTMLDivElement;

  render() {
    const { classes, disabled, id, maxLength, name, onFocus, pattern } = this.props;
    const { val } = this.state;
    const attributes = {
      autoCapitalize: 'off',
      autoComplete: 'off',
      autoCorrect: 'off',
      className: classes,
      disabled,
      id,
      maxLength,
      name,
      onKeyDown: this.onKeydown,
      onChange: this.onChange.bind(this),
      onFocus: onFocus ? onFocus.bind(this) : null,
      pattern,
      ref: (e) => { this.input = e; },
      spellCheck: 'false',
      type: 'text',
      value: val,
    };

    return (
      <TextField
        id="s-bssare"
        className={classes}
        margin="normal"
        inputProps={{ 'aria-label': 'bare' }}
        {...attributes}
      />
    )
  }
}

AmountInput.defaultProps = {
  currentValue: '',
  onFocus: null,
  focus: false,
  maxWholePartLength: 10,
  maxDecimalPartLength: 2,
  name: '',
  id: '',
  classes: '',
  pattern: '[0-9.]*',
  disabled: false,
};

export default AmountInput;
