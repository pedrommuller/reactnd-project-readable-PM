const clone = require('clone')

let db = {}

const defaultData = {
  categories: [
      {
        name:'Programming',
        path:'programming'
      },
      {
        name:'Philosophy',
        path:'philosophy'
      },
      {
        name: 'React',
        path: 'react'
      },
      {
        name: 'Redux',
        path: 'redux'
      },
      {
        name: 'Udacity',
        path: 'udacity'
      }
  ]
}

function getData (token) {
  console.log('token',token);
  //Each token has it's own copy of the DB. The token in this case is like an app id.
  let data = db[token]
  //This populates the default user data if there isn't any in the db.
  if (data == null) {
    data = db[token] = clone(defaultData)
  }
  console.log('data',data);
  return data
}

function getAll (token) {
  return new Promise((res) => {
    res(getData(token))
  })
}

module.exports = {
  getAll
}
