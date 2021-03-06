import * as types from '../action.types';

const initialState = {
  list: {},
  detail: {},
  comments: [],
};

export default function posts(state = initialState, action) {
  switch (action.type) {
    case types.ORDER_POSTS:
      return {
        ...state,
        order: action.order,
      };

    case types.GET_POSTS:
      return {
        ...state,
        list: action.posts,
      };
    case types.SAVE_POST:
      return {
        ...state,
        list:
            [...[action.post], ...state.list],
      };
    case types.EDIT_POST_DETAIL:
      return {
        ...state,
        detail: action.post,
      };
    case types.EDIT_POST:
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
    case types.EDIT_COMMENT:
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
    case types.DELETE_POST:
      return {
        ...state,
        list: state.list.filter(e => e.id !== action.id),
      };
    case types.DELETE_POST_DETAIL: {
      return {
        ...state,
      };
    }
    case types.DELETE_COMMENT:
      return {
        ...state,
        comments: state.comments.filter(e => e.id !== action.id),
      };
    case types.GET_POSTS_BY_CATEGORY:
      return {
        ...state,
        list: action.posts,
      };
    case types.VOTE_POST:
      return {
        ...state,
        list: state.list.map((e) => (
              e.id === action.detail.id ?
              action.detail : e
              )
            ),
      };
    case types.VOTE_POST_DETAIL:
      return {
        ...state,
        detail: action.detail,
      };
    case types.VOTE_COMMENT:
      return {
        ...state,
        comments: state.comments.map((e) => (
              e.id === action.comment.id ?
              action.comment : e
            )
        ),
      };
    case types.GET_POST:
      return {
        ...state,
        detail: action.detail,
      };

    case types.GET_COMMENTS:
      return {
        ...state,
        comments: action.comments,
      };

    case types.SAVE_COMMENT:
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
