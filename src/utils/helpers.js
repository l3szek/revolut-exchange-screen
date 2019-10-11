// @flow

/**
 * Focus on input field and put cursor after the text
 */
export const focusOnContentEnd = (input: HTMLInputElement) => {
  input.focus();
  // set selection to the end of field content
  if (input.setSelectionRange) {
    input.setSelectionRange(input.value.length, input.value.length);
  } else if (input.createTextRange) {
    const range = input.createTextRange();
    range.collapse(true);
    range.moveEnd('character', input.value.length);
    range.moveStart('character', input.value.length);
    range.select();
  }
};

/**
 * Format the input value
 */
export const getFormattedValue = (currentValue, formatNumber, maxWholePartLength, maxDecimalPartLength) => {
  let currentVal = String(currentValue);
  if (currentVal === '') {
    return currentVal;
  }

  let decimalPart = '';

  currentVal = currentVal.replace('..', '.');

  if (currentVal.startsWith('.')) {
    currentVal = currentVal.substr(1);
  }

  const parsedValue = currentVal.split('.');

  let wholePart = formatNumber(parsedValue[0], maxWholePartLength);

  if (parsedValue.length > 1) {
    decimalPart = formatNumber(parsedValue[1], maxDecimalPartLength);
  }

  const newValue = wholePart === '' ? '' : `${wholePart}.${decimalPart}`;
  return parsedValue.length === 1 ? wholePart : newValue;
}

export const formattedAmount = (amount: number) => {
  const formatter = new Intl.NumberFormat('en-EN', {maximumFractionDigits: 4});
  const formattedAmount = formatter.format(amount);
  return formattedAmount
}