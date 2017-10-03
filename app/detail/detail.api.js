const api = "http://localhost:3001/api/v1.0"

// Generate a unique token required by the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

export const getComments = (id) =>{
  return fetch(`${api}/posts/${id}/comments`, {
    headers ,
    method:'GET'
  }).then(res => res.json())
    .then(data =>data)
}

export const getPost = (id) =>{
    return fetch(`${api}/posts/${id}`, {
      headers ,
      method:'GET'
    }).then(res => res.json())
      .then(data =>data)
}
