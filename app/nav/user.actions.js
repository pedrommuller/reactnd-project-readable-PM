export function setCurrentUser(currentUser) {
  return {
    type: 'SET_CURRENT_USER',
    current: currentUser,
  };
}
