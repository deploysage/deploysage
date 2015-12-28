import actionTypes from './actionTypes';

export function updateUrl(url) {
  return {
    type: actionTypes.REPO_URL_UPDATE,
    url,
  };
}
