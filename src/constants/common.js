// @flow
export type Dispatch = (action: Object | Function) => Function;

export const CURRENCY = {
  EUR: 'EUR',
  USD: 'USD',
  GBP: 'GBP',
  PLN: 'PLN',
}

export const KEYCODES = {
  ENTER: 13,
};

export const exchangeRatesApi = 'https://api.exchangeratesapi.io';
export const localhost = 'http://localhost';
export const userWalletApiMock = '/utils/userWalletMock.json';