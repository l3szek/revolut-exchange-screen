// @flow

export const formatNumber = (value: number, digitsLimit: number = 10) => {
  const val = String(value);
  const parsedValue = val.replace(/[^\d]+/i, '');
  return parsedValue.slice(0, digitsLimit);
}

/**
 * Format the input value
 */
export const getFormattedValue = (currentValue: number) => {

  const maxWholePartLength = 10;
  const maxDecimalPartLength = 2;
  let currentVal = String(currentValue);
  if (currentVal === '') {
    return currentVal;
  }

  let decimalPart = '';

  currentVal = currentVal.replace('..', '.');

  if ((currentVal.length > 1 && currentVal.startsWith('0') && currentVal.charAt(1) !== '.') || currentVal.startsWith('.')) {
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

export const checkAmountFields = (amount: string | number) => {
  const amountTypeEnd = typeof amount === 'string' ? amount.endsWith('.') : false;
  const checkAmount = amount === 0
    || amount.length === 0
    || amount === '0'
    || amount === '0.00'
    || amount === '0.0'
    || amountTypeEnd;
  return checkAmount;
}