import actionTypes from './actionTypes';

export function authenticated(user) {
  return {
    type: actionTypes.AUTHENTICATED,
    user,
  };
}

export function updateUrl(url) {
  return {
    type: actionTypes.REPO_URL_UPDATE,
    url,
  };
}
