import { compose, createStore, applyMiddleware, combineReducers } from 'redux';

// See https://github.com/gaearon/redux-thunk and http://redux.js.org/docs/advanced/AsyncActions.html
// This is not actually used for this simple example, but you'd probably want to use this once your app has
// asynchronous actions.
import thunkMiddleware from 'redux-thunk';

// This provides an example of logging redux actions to the console.
// You'd want to disable this for production.
import loggerMiddleware from 'libs/middlewares/loggerMiddleware';

import reducers from '../reducers';
import { initalStates } from '../reducers';

export default props => {
  // This is how we get initial props Rails into redux.
  const { $$deploySageState } = initalStates;

  // Redux expects to initialize the store using an Object, not an Immutable.Map
  const initialState = {
    $$deploySageStore: $$deploySageState.merge(props),
  };

  const reducer = combineReducers(reducers);
  const composedStore = compose(
    applyMiddleware(thunkMiddleware, loggerMiddleware)
  );
  const storeCreator = composedStore(createStore);
  const store = storeCreator(reducer, initialState);

  return store;
};
