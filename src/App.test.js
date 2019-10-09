import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import App from './App';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
const store = mockStore({
  reducer: {
    fetchingExchangeRates: false,
    customerWallet: [],
  }
})

it('renders without crashing', () => {
  shallow(<App store={store} />);
});