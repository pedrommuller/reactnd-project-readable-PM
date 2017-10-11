const initialState = {
  list: {},
  detail: {},
  comments: [],
};

export default function posts(state = initialState, action) {
  switch (action.type) {
    case 'ORDER_POSTS':
      return {
        ...state,
        order: action.order,
      };

    case 'GET_POSTS':
      return {
        ...state,
        list: action.posts,
      };
    case 'SAVE_POST':
      return {
        ...state,
        list:
            [...[action.post], ...state.list],
      };
    case 'EDIT_POST':
      return {
        ...state,
        list: state.list.map((e, i) => (
          e.id === action.post.id ?
          {
            ...state.list[i],
            body: action.post.body,
            title: action.post.title,
            category: action.post.category,
          } : e)
        ),
      };
    case 'EDIT_COMMENT':
      return {
        ...state,
        comments: state.comments.map((e, i) => (
          e.id === action.comment.id ?
          {
            ...state.comments[i],
            body: action.comment.body,
            timestamp: action.comment.timestamp,
          } : e)
        ),
      };
    case 'DELETE_POST':
      return {
        ...state,
        list: state.list.filter(e => e.id !== action.id),
      };
    case 'GET_POSTS_BY_CATEGORY':
      return {
        ...state,
        list: action.posts,
      };
    case 'VOTE_POST':
      return {
        ...state,
        list: state.list.map((e) => (
              e.id === action.detail.id ?
              action.detail : e
              )
            ),
      };
    case 'VOTE_POST_DETAIL':
      return {
        ...state,
        detail: action.detail,
      };
    case 'VOTE_COMMENT':
      return {
        ...state,
        comments: state.comments.map((e) => (
              e.id === action.comment.id ?
              action.comment : e
            )
        ),
      };
    case 'GET_POST':
      return {
        ...state,
        detail: action.detail,
      };

    case 'GET_COMMENTS':
      return {
        ...state,
        comments: action.comments,
      };

    case 'SAVE_COMMENT':
      return {
        ...state,
        comments: [
          ...state.comments,
          ...[action.comment],
        ],
      };

    default:
      return state;
  }
}
