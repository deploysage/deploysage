import actionTypes from '../actions/actionTypes';

export default function deploySageReducer($$state, action) {
  if ($$state === undefined) {
    // on app startup, reducer is called a couple of timeswith undefined before store passes
    // in initial state (from rails view via react_on_rails) on a subsequent call.
    // In that case, just no-op and return an empty object until we get a state passed
    // from the store.
    return {};
  }

  const { type, name } = action;

  switch (type) {
    case actionTypes.ORG_NAME_UPDATE:
      {
        const orgId = $$state.getIn(['result', 'orgs']).first();
        return $$state.setIn(['entities', 'orgs', orgId, 'name'], name);
      }

    default:
      {
        return $$state;
      }
  }
}
