import React from 'react';
import { Provider } from 'react-redux';

import createStore from '../store/deploySageStore';
import DeploySage from '../containers/DeploySage';

// See documentation for https://github.com/rackt/react-redux.
// This is how you get props from the Rails view into the redux store.
// This code here binds your smart component to the redux store.
const DeploySageAppClient = props => {
  const store = createStore(props);
  const reactComponent = (
    <Provider store={store}>
      <DeploySage />
    </Provider>
  );
  return reactComponent;
};

export default DeploySageAppClient;
