// @flow
import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { fetchUserWallet } from './actions/actions';

import type { AppState } from './reducers/rootReducer';
import type { Dispatch } from './constants/common';

type Props = {
  userWallet: Array<any>,
  getuserWallet: Function,
}

const App = (props: Props) => {
  const { userWallet, getuserWallet } = props;
  useEffect(() => {
    getuserWallet();
  }, []);
  
  return (
    <div>
      <h1>Revolut exchange </h1>
      {userWallet.map(item => item.currency)}
    </div>
  );
}


const mapStateToProps = (state: AppState): $Shape<Props> => ({
  userWallet: state.userWallet
});

const mapDispatchToProps = (dispatch: Dispatch): $Shape<Props> => ({
  getuserWallet: () => dispatch(fetchUserWallet())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);