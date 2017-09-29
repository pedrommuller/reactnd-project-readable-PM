import {getAll} from './home.api.js'
import {getCategories} from '../nav/category.actions.js'

function postAction(posts){
  return {
    type:'GET_POSTS',
    posts:posts
  }
}

export function getHomeData(){
    return function(dispatch){
      dispatch(getCategories());
      getAll().then(posts=>
        dispatch(postAction(posts))
      )
    }
}
