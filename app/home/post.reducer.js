const initialState = {
  list:{}
}

export default function posts(state = initialState,action){
  switch (action.type) {
    case 'GET_POSTS':
      return {
        ...state,
        ['list']:action.posts
      }
      break;
    default:
      return state;
  }
  return state
}
