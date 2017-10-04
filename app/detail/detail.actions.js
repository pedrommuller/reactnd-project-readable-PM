import {getPost,getComments,saveComment} from './detail.api.js'

function getPostAction(post){
  return {
    type:'GET_POST',
    detail:post
  }
}

function saveCommentAction(comment){
  return {
    type:'SAVE_COMMENT',
    comment:comment
  }
}

function getCommentsAction(comments){
    return{
      type:'GET_COMMENTS',
      comments:comments
    }
}

export function saveNewComment(comment){
  return function(dispatch){
    saveComment(comment).then(
      response=>dispatch(saveCommentAction(response))
    );
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
