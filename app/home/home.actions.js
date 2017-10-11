import { getAllByCategory, deletePost } from './home.api.js';
import { votePost } from '../detail/detail.api.js';
import { getCategories } from '../nav/category.actions.js';

function postByCategory(posts) {
  return {
    type: 'GET_POSTS_BY_CATEGORY',
    posts,
  };
}

function deletePostAction(id) {
  return {
    type: 'DELETE_POST',
    id,
  };
}

function votePostAction(detail) {
  return {
    type: 'VOTE_POST',
    detail,

  };
}

export function orderPostBy(order) {
  return {
    type: 'ORDER_POSTS',
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
