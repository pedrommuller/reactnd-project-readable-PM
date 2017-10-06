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
    case 'SAVE_POST':
        return {
          ...state,
          ['list']:
            [...[action.post],...state.list]
        }

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

    case 'GET_COMMENTS':
    return {
      ...state,
      ['comments']:action.comments
    }

    case 'SAVE_COMMENT':
    return {
      ...state,
      ['comments']:[
        ...[action.comment],
        ...state['comments']
      ]
    }

    default:
      return state;
  }
  return state
}
