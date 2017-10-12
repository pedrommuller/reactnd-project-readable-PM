import { getAll } from './category.api.js';
import * as types from '../action.types';

function categoriesAction(categories) {
  return {
    type: types.GET_CATEGORIES,
    categories,
  };
}

export function getCategories() {
  return function (dispatch) {
    return getAll().then(
      categories => {
        dispatch(categoriesAction(categories));
      }
    );
  };
}
