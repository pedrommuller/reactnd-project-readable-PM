import { deletePost } from '../home/home.api.js';
import * as API from './detail.api.js';
import * as types from '../action.types';

function getPostAction(post) {
  return {
    type: types.GET_POST,
    detail: post,
  };
}

function saveCommentAction(comment) {
  return {
    type: types.SAVE_COMMENT,
    comment,
  };
}

function getCommentsAction(comments) {
  return {
    type: types.GET_COMMENTS,
    comments,
  };
}

function editCommentAction(comment) {
  return {
    type: types.EDIT_COMMENT,
    comment,
  };
}

function votePostDetailAction(detail) {
  return {
    type: types.VOTE_POST_DETAIL,
    detail,

  };
}

function voteCommentAction(comment) {
  return {
    type: types.VOTE_COMMENT,
    comment,
  };
}

function deleteCommentAction(id) {
  return {
    type: types.DELETE_COMMENT,
    id,
  };
}

function deletePostAction(id){
  return {
    type: types.DELETE_POST_DETAIL,
    id
  }
}

export function deleteCurrentPost(id) {
  return function (dispatch) {
    deletePost(id).then(() => dispatch(
      deletePostAction(id)
    ));
  };
}

export function deleteCurrentComment(id) {
  return function (dispatch) {
    API.deleteComment(id).then(() => {
      dispatch(deleteCommentAction(id));
    });
  };
}

export function voteNewComment(postId, option) {
  return function (dispatch) {
    API.voteComment(postId, option).then(
      response => dispatch(voteCommentAction(response))
    );
  };
}

export function votePostDetail(postId, option) {
  return function (dispatch) {
    API.votePost(postId, option).then(
      response => dispatch(votePostDetailAction(response))
    );
  };
}

export function editCurrentComment(comment) {
  return function (dispatch) {
    API.editComment(comment).then(
      response => dispatch(editCommentAction(response))
    );
  };
}

export function saveNewComment(comment) {
  return function (dispatch) {
    API.saveComment(comment).then(
      response => dispatch(saveCommentAction(response))
    );
  };
}

export function getPostDetail(id) {
  return function (dispatch) {
    Promise.all([API.getPost(id), API.getComments(id)]).then(values => {
      values[0].fetched = true;
      dispatch(getPostAction(values[0]));
      dispatch(getCommentsAction(values[1]));
    });
  };
}
