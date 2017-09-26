import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'

//reducers
import questions from './home/question.reducer'
import users from './nav/user.reducer'
import categories from './nav/category.reducer'


export default {
  questions:questions,
  users:users,
  categories:categories
}
