import {getAll, getAllByCategory, deletePost} from './home.api.js'
import {votePost} from '../detail/detail.api.js'
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

function deletePostAction(id){
  return {
    type:'DELETE_POST',
    id:id
  }
}

function votePostAction(detail){
  return {
    type:'VOTE_POST',
    detail:detail

  }
}

export function votePostHome(postId, option){
  return function(dispatch){
    votePost(postId,option).then(
      response=>dispatch(votePostAction(response))
    );
  }
}

export function deleteCurrentPost(id){
  return function(dispatch){
    deletePost(id).then(response=>dispatch(
      deletePostAction(id)
    ))
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
    }
}
