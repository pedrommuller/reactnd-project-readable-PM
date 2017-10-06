import {savePost} from './post.api.js'

function savePostAction(post){
  return {
    type:'SAVE_POST',
    post:post
  }
}

export function saveNewPost(post){
  return function(dispatch){
    savePost(post).then(
      response=> dispatch(savePostAction(response))
    )
  }
}
