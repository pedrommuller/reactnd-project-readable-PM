import * as types from '../action.types';
import { savePost, editPost } from './post.api.js';

function savePostAction(post) {
  return {
    type: types.SAVE_POST,
    post,
  };
}

function editPostAction(post) {
  return {
    type: types.EDIT_POST,
    post,
  };
}

export function editCurrentPost(post) {
  return function (dispatch) {
    editPost(post).then(
      response => dispatch(editPostAction(response))
    );
  };
}

export function saveNewPost(post) {
  return function (dispatch) {
    savePost(post).then(
      response => dispatch(savePostAction(response))
    );
  };
}
