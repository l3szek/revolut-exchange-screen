// @flow
import React from 'react';
import { focusOnContentEnd, getFormattedValue } from '../utils/helpers';
import { KEYCODES } from '../constants/common';
import TextField from '@material-ui/core/TextField';

import { formattedAmount } from '../utils/helpers';


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
  autoFocus?: boolean,
}

class AmountInput extends React.Component<Props> {
  constructor(props) {
    super(props);
    const initialValue = props.currentValue > 0 ? props.currentValue : '';
    this.state = {
      value: this.getStateWithFormattedValue(initialValue),
      focused: false
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currentValue !== this.props.currentValue) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        value: this.getStateWithFormattedValue(this.props.currentValue)
      });
    }
    if (this.props.focus) {
      focusOnContentEnd(this.input);
    }
  }

  /*
  static getDerivedStateFromProps(props, state) {
    if (props.currentValue !== state.value) {
      return {
        value: getFormattedValue(props.currentValue, 10, 20)
      };
    }
    return null;
  }

  */

  onKeydown = (event) => {
    const target = event.currentTarget;
    if (event.keyCode === KEYCODES.ENTER) {
      target.blur();
    }
  };

  onChange = (event) => {
    const newState = this.getStateWithFormattedValue(event.target.value);

    if (newState!== this.state.value) {
      // user allowed to type the point on the right side, but the
      // component does not count it when giving result number outside
      const eventValue = newState.endsWith('.') ? newState.slice(0, -1) : newState;

      event.target.value = eventValue;
      this.props.onChangeAmount(event);
    }

    this.setState({
      value: newState
    });
  }

  onFocus = () => {
    this.setState({
      focused: !this.state.focused
    });
  }

  getStateWithFormattedValue = (currentValue) => getFormattedValue(currentValue)
  

  input: ?HTMLDivElement;

  render() {
    const { classes, disabled, id, maxLength, name, pattern, autoFocus } = this.props;
    const { value, focused } = this.state;
    const amountFormatted = formattedAmount(value);

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
      onChange: this.onChange,
      onFocus: this.onFocus,
      onBlur: this.onFocus,
      pattern,
      ref: (e) => { this.input = e; },
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
    )
  }
}

AmountInput.defaultProps = {
  currentValue: '',
  onFocus: null,
  focus: false,
  name: '',
  id: '',
  classes: '',
  pattern: '[0-9.]*',
  disabled: false,
};

export default AmountInput;
