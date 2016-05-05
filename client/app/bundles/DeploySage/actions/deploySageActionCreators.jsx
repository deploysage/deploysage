import actionTypes from './actionTypes';

export function authenticated(user) {
  return {
    type: actionTypes.AUTHENTICATED,
    user,
  };
}

export function applyChangeOperations(changeOperationsDocument) {
  return {
    type: actionTypes.APPLY_CHANGE_OPERATIONS,
    changeOperationsDocument,
  };
}
