  /* global fetch:false, localStorage:false*/

const api = 'http://localhost:3001/api/v1.0';

// Generate a unique token required by the backend server.
let token = localStorage.token;
if (!token) { token = localStorage.token = Math.random().toString(36).substr(-8); }

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  Authorization: token,
};

export const deleteComment = (commentId) =>
fetch(`${api}/comments/${commentId}`, {
  headers,
  method: 'DELETE',
  body: JSON.stringify({ commentId }),
}).then(res => res.json())
.then(data => data);

export const voteComment = (commentId, option) =>
    fetch(`${api}/comments/${commentId}`, {
      headers,
      method: 'POST',
      body: JSON.stringify({ option }),
    }).then(res => res.json())
    .then(data => data);


export const votePost = (postId, option) =>
    fetch(`${api}/posts/${postId}`, {
      headers,
      method: 'POST',
      body: JSON.stringify({ option }),
    }).then(res => res.json())
    .then(data => data);


export const editComment = (comment) =>
  fetch(`${api}/comments/${comment.id}`, {
    headers,
    method: 'PUT',
    body: JSON.stringify(comment),
  }).then(res => res.json()).then(data => data);


export const saveComment = (comment) =>
    fetch(`${api}/comments`, {
      headers,
      method: 'POST',
      body: JSON.stringify(comment),
    }).then(res => res.json())
    .then(data => data);


export const getComments = (id) =>
  fetch(`${api}/posts/${id}/comments`, {
    headers,
    method: 'GET',
  }).then(res => res.json())
    .then(data => data);


export const getPost = (id) =>
    fetch(`${api}/posts/${id}`, {
      headers,
      method: 'GET',
    }).then(res => res.json())
      .then(data => data);
