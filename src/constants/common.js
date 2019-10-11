// @flow
export type Dispatch = (action: Object | Function) => Function;

export const CURRENCIES = {
  EUR: 'EUR',
  USD: 'USD',
  GBP: 'GBP',
  PLN: 'PLN',
}

export const KEYCODES = {
  UP_ARROW: 38,
  DOWN_ARROW: 40,
  SPACE: 32,
  ENTER: 13,
};