import actionTypes from './actionTypes';

export function updateName(name) {
  return {
    type: actionTypes.ORG_NAME_UPDATE,
    name,
  };
}
