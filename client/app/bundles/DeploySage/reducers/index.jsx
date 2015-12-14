// This file is our manifest of all reducers for the app.
// See also /client/app/bundles/DeploySage/store/deploySageStore.jsx
// `https://github.com/shakacode/react_on_rails/tree/master/docs/additional_reading/generated_client_code.md`
import deploySageReducer from './deploySageReducer';
import { $$initialState as $$deploySageState } from './deploySageReducer';

export default {
  $$deploySageStore: deploySageReducer,
};

export const initalStates = {
  $$deploySageState,
};
