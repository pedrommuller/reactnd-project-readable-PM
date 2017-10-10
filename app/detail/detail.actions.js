import {getPost,getComments,saveComment, editComment, votePost} from './detail.api.js'

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
    return {
      type:'GET_COMMENTS',
      comments:comments
    }
}

function editCommentAction(comment){
  return {
    type:'EDIT_COMMENT',
    comment:comment
  }
}

function votePostDetailAction(detail){
  return {
    type:'VOTE_POST_DETAIL',
    detail:detail

  }
}

export function votePostDetail(postId, option){
  return function(dispatch){
    votePost(postId,option).then(
      response=>dispatch(votePostDetailAction(response))
    );
  }
}

export function editCurrentComment(comment){
  return function(dispatch){
    editComment(comment).then(
      response=>dispatch(editCommentAction(response))
    );
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
