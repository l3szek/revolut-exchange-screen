/* eslint-disable import/namespace,import/no-extraneous-dependencies */
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import nock from 'nock';

import { exchangeRatesApi } from '../constants/common';

//
// Return store and its inital state,
// optionally with attached spies that log state changes and actions taken,
// optionally with set of actions to run before spying begins
//
const mockStore = (rootReducer, changeLog = null, actionsLog = null, initialActions = []) => {
  let middleware;
  // if actions should be logged, attach simple proxy middleware that logs actions into array
  if (actionsLog) {
    middleware = applyMiddleware(
      thunk,
      () => next => (theAction) => {
        if (theAction) {
          actionsLog.push(theAction);
          next(theAction);
        }
      }
    );
  } else {
    middleware = applyMiddleware(thunk);
  }
  const store = createStore(rootReducer, middleware);
  // if initialActions were provided, dispatch all of them, and make sure the logs are empty
  if (initialActions.length) {
    initialActions.forEach((action) => { store.dispatch(action); });
    actionsLog.splice(0, actionsLog.length);
  }
  // if state change should be logged, attach simple listener that logs state into array after each change
  if (changeLog) {
    changeLog.push(store.getState());
    store.subscribe(() => {
      changeLog.push(store.getState());
    });
  }
  const initialState = store.getState();
  return { store, initialState };
};
const mockApi = () =>
  nock(exchangeRatesApi).defaultReplyHeaders({ 'access-control-allow-origin': '*' }).log(console.log);
const beforeAll = () => {
  mockApi();
};
const afterAll = () => {
  nock.cleanAll();
};

const responseOptions = { 'Content-Type': 'application/json' };

export default {
  beforeAll,
  afterAll,
  mockApi,
  mockStore,
  responseOptions,
};
