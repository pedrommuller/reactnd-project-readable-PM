const initialState = {
  list:{},
  detail:{},
  comments:[]
}

export default function posts(state = initialState,action){
  switch (action.type) {
    case 'GET_POSTS':
      return {
        ...state,
        ['list']:action.posts
      }
    break;
    case 'GET_POSTS_BY_CATEGORY':
      return {
        ...state,
        ['list']:action.posts
      }
    case 'GET_POST':
      return {
        ...state,
        ['detail']:action.detail
      }
    break;
    case 'GET_COMMENTS':
    return {
      ...state,
      ['comments']:action.comments
    }
    default:
      return state;
  }
  return state
}
