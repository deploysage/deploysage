import actionTypes from '../actions/actionTypes';

export default function deploySageReducer($$state, action) {
  if ($$state === undefined) {
    // on app startup, reducer is called with undefined before store passes in
    // initial state on a subsequent call.  In that case, just no-op
    // and return an empty object
    return {};
  }

  const { type, name } = action;

  switch (type) {
    case actionTypes.ORG_NAME_UPDATE:
      {
        const orgId = $$state.get('orgs').get(0);
        return $$state.setIn(['orgsById', orgId, 'name'], name);
      }

    default:
      {
        return $$state;
      }
  }
}
