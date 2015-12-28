import React from 'react';
import { Provider } from 'react-redux';

import configureStore from '../store/configureStore';
import DeploySage from '../containers/DeploySage';

// See documentation for https://github.com/rackt/react-redux.
// This is how you get props from the Rails view into the redux store.
// This code here binds your smart component to the redux store.
// This is how the server redux gets hydrated with data.
const DeploySageApp = props => {
  const store = configureStore(props);
  const reactComponent = (
    <Provider store={store}>
      <DeploySage />
    </Provider>
  );
  return reactComponent;
};

export default DeploySageApp;
