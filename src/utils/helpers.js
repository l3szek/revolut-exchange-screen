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

export const formatNumber = (value, digitsLimit = 10) => {
  const val = String(value);
  const parsedValue = val.replace(/[^\d]+/i, '');
  return parsedValue.slice(0, digitsLimit);
}

/**
 * Format the input value
 */
export const getFormattedValue = (currentValue) => {

  const maxWholePartLength = 10;
  const maxDecimalPartLength = 2;
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

export const formattedAmount = (amount: number, maxFractionDigfits?: number) => {
  const formatter = new Intl.NumberFormat('en-EN', {maximumFractionDigits: maxFractionDigfits || 4});
  const formattedAmount = formatter.format(amount);
  return formattedAmount
}