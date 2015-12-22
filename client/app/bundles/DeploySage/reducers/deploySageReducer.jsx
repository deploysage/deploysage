import Immutable from 'immutable';

import actionTypes from '../actions/actionTypes';

export const $$initialState = Immutable.fromJS({
  orgsById: {},
  orgs: [],
});

export default function deploySageReducer($$state = $$initialState, action) {
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
