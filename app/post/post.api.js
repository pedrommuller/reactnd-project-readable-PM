const api = 'http://localhost:3001/api/v1.0';

// Generate a unique token required by the backend server.
let token = localStorage.token;
if (!token) { token = localStorage.token = Math.random().toString(36).substr(-8); }

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  Authorization: token,
};

export const editPost = (post) => fetch(`${api}/posts/${post.id}`, {
  headers,
  method: 'PUT',
  body: JSON.stringify(post),
}).then(res => res.json())
    .then(data => data);

export const savePost = (post) => fetch(`${api}/posts`, {
  headers,
  method: 'POST',
  body: JSON.stringify(post),
}).then(res => res.json())
    .then(data => data);
