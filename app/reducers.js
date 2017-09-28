import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'

//reducers
import posts from './home/post.reducer'
import users from './nav/user.reducer'
import categories from './nav/category.reducer'


export default {
  posts:posts,
  users:users,
  categories:categories
}
