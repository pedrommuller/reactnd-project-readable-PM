const initialState = {
  list: [],
};

export default function categories(state = initialState, action) {
  switch (action.type) {
    case 'GET_CATEGORIES':
      return {
        ...state,
        list: action.categories,
      };
    default:
      return state;
  }
}
