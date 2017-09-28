const initialState ={
  list:[],
}

export default function categories(state=initialState, action){
  debugger;
  switch (action.type) {
    case 'GET_CATEGORIES':
      return {
        list:action.categories
      }
      break;
    default:
      return state;
  }
}
