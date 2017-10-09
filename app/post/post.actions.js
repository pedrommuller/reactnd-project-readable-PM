import {savePost, editPost} from './post.api.js'

function savePostAction(post){
  return {
    type:'SAVE_POST',
    post:post
  }
}

function editPostAction(post){
  return {
    type:'EDIT_POST',
    post:post
  }
}

export function editCurrentPost(post){
  return function(dispatch){
    editPost(post).then(
      response=>dispatch(editPostAction(response))
    );
  }
}

export function saveNewPost(post){
  return function(dispatch){
    savePost(post).then(
      response=> dispatch(savePostAction(response))
    )
  }
}
