import * as types from '../action.types';

const initialState = {
  list: [],
};

export default function categories(state = initialState, action) {
  switch (action.type) {
    case types.GET_CATEGORIES:
      return {
        ...state,
        list: action.categories,
      };
    default:
      return state;
  }
}
