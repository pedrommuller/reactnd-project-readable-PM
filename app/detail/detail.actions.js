import { getPost, getComments, saveComment, editComment, votePost, voteComment } from './detail.api.js';

function getPostAction(post) {
  return {
    type: 'GET_POST',
    detail: post,
  };
}

function saveCommentAction(comment) {
  return {
    type: 'SAVE_COMMENT',
    comment,
  };
}

function getCommentsAction(comments) {
  return {
    type: 'GET_COMMENTS',
    comments,
  };
}

function editCommentAction(comment) {
  return {
    type: 'EDIT_COMMENT',
    comment,
  };
}

function votePostDetailAction(detail) {
  return {
    type: 'VOTE_POST_DETAIL',
    detail,

  };
}

function voteCommentAction(comment) {
  return {
    type: 'VOTE_COMMENT',
    comment,
  };
}

export function voteNewComment(postId, option) {
  return function (dispatch) {
    voteComment(postId, option).then(
      response => dispatch(voteCommentAction(response))
    );
  };
}

export function votePostDetail(postId, option) {
  return function (dispatch) {
    votePost(postId, option).then(
      response => dispatch(votePostDetailAction(response))
    );
  };
}

export function editCurrentComment(comment) {
  return function (dispatch) {
    editComment(comment).then(
      response => dispatch(editCommentAction(response))
    );
  };
}

export function saveNewComment(comment) {
  return function (dispatch) {
    saveComment(comment).then(
      response => dispatch(saveCommentAction(response))
    );
  };
}

export function getPostDetail(id) {
  return function (dispatch) {
    getPost(id).then(
      posts => dispatch(getPostAction(posts))
    );
    getComments(id).then(
      comments => dispatch(getCommentsAction(comments))
    );
  };
}
