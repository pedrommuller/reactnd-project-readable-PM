import * as types from '../action.types';

export function setCurrentUser(currentUser) {
  return {
    type: types.SET_CURRENT_USER,
    current: currentUser,
  };
}
