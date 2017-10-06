import {getAll, getAllByCategory} from './home.api.js'
import {getCategories} from '../nav/category.actions.js'

function postAction(posts){
  return {
    type:'GET_POSTS',
    posts:posts
  }
}

function postByCategory(posts){
  return {
    type:'GET_POSTS_BY_CATEGORY',
    posts:posts
  }
}

export function getPostsByCategory(category){
  return function(dispatch){
    getAllByCategory(category).then(
      posts=>dispatch(postByCategory(posts))
    )
  }
}

export function getHomeData(category){
    return function(dispatch){
      dispatch(getCategories());
      dispatch(getPostsByCategory(category));
      // getAll().then(posts=>
      //   dispatch(postAction(posts))
      // )
    }
}
