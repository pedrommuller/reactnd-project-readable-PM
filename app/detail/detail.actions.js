import {getPost,getComments} from './detail.api.js'

function getPostAction(post){
  return {
    type:'GET_POST',
    detail:post
  }
}

function getCommentsAction(comments){
    return{
      type:'GET_COMMENTS',
      comments:comments
    }
}

export function getPostDetail(id) {
  return function(dispatch){
    getPost(id).then(
      posts=>dispatch(getPostAction(posts))
    );
    getComments(id).then(
      comments=>dispatch(getCommentsAction(comments))
    );
  }
}
