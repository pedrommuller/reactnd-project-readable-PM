import { getAllByCategory, deletePost } from './home.api';
import { votePost } from '../detail/detail.api';
import { getCategories } from '../nav/category.actions';
import * as types from '../action.types';

function postByCategory(posts) {
  return {
    type: types.GET_POSTS_BY_CATEGORY,
    posts,
  };
}

function deletePostAction(id) {
  return {
    type: types.DELETE_POST,
    id,
  };
}

function votePostAction(detail) {
  return {
    type: types.VOTE_POST,
    detail,

  };
}

export function orderPostBy(order) {
  return {
    type: types.ORDER_POSTS,
    order,
  };
}

export function votePostHome(postId, option) {
  return function (dispatch) {
    votePost(postId, option).then(
      response => dispatch(votePostAction(response))
    );
  };
}

export function deleteCurrentPost(id) {
  return function (dispatch) {
    deletePost(id).then(() => dispatch(
      deletePostAction(id)
    ));
  };
}

export function getPostsByCategory(category) {
  return function (dispatch) {
    getAllByCategory(category).then(
      posts => dispatch(postByCategory(posts))
    );
  };
}

export function getHomeData(category) {
  return function (dispatch) {
    dispatch(getCategories());
    dispatch(getPostsByCategory(category));
  };
}
