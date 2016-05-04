import actionTypes from '../actions/actionTypes';

export default function deploySageReducer($$state, action) {
  if ($$state === undefined) {
    // on app startup, reducer is called a couple of times with undefined before store passes
    // in initial state (from rails view via react_on_rails) on a subsequent call.
    // In that case, just no-op and return an empty object until we get a state passed
    // from the store.
    return {};
  }

  const { type, url, user } = action;

  switch (type) {
    case actionTypes.AUTHENTICATED:
    { // eslint-disable-line indent
      const clientState = { uiState: 'authenticated', currentUser: user };
      return $$state.mergeIn(['clientState'], clientState);
    }

    case actionTypes.REPO_URL_UPDATE:
    { // eslint-disable-line indent
      const repoId = $$state.getIn(['result', 'repos']).first();
      return $$state.setIn(['entities', 'repos', repoId, 'url'], url);
    }

    default: // eslint-disable-line indent
    { // eslint-disable-line indent
      return $$state;
    }
  }
}
