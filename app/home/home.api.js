const api = "http://localhost:3001/api/v1.0"

// Generate a unique token required by the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

export const deletePost = (id)=>{
  fetch(`${api}/posts/${id}`, {
    headers ,
    method:'DELETE'
  }).then(res => res.json())
    .then(data =>data)
}

export const getAllByCategory = (category) =>{
  const url = category===''? `${api}/posts`:
    `${api}/${category}/posts`
    return fetch(url, {
      headers ,
      method:'GET'
    }).then(res => res.json())
      .then(data =>data)
}

export const getAll = () =>
  fetch(`${api}/posts`, {
    headers ,
    method:'GET'
  }).then(res => res.json())
    .then(data =>data)
