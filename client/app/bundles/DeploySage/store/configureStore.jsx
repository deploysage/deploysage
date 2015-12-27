import { compose, createStore, applyMiddleware, combineReducers } from 'redux';
import Immutable from 'immutable';
import { camelizeKeys } from 'humps';

// See https://github.com/gaearon/redux-thunk and http://redux.js.org/docs/advanced/AsyncActions.html
// This is not actually used for this simple example, but you'd probably want to use this once your app has
// asynchronous actions.
import thunk from 'redux-thunk';
import logger from 'libs/middlewares/logger';

import reducers from '../reducers';

export default props => {
  // props is how we get initial props from Rails view into redux.
  const camelizedProps = camelizeKeys(props);

  // Redux expects to initialize the store using an Object, not an Immutable.Map
  const initialState = {
    $$deploySageStore: Immutable.fromJS(camelizedProps),
  };

  const reducer = combineReducers(reducers);
  const composedStore = compose(
    applyMiddleware(thunk, logger)
  );
  const storeCreator = composedStore(createStore);
  const store = storeCreator(reducer, initialState);

  return store;
};
