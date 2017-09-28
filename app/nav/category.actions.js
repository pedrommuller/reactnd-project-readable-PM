import {getAll} from './category.api.js'

function categoriesAction(categories){
  return {
    type:'GET_CATEGORIES',
    categories:categories
  }
}

export function getCategories(){
  return function(dispatch){
    return getAll().then(
      categories=>{
        dispatch(categoriesAction(categories))
      }
    )
  }
}
