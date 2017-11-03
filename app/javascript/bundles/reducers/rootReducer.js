import { combineReducers } from 'redux'
import service from './serviceReducer'
import task from './taskReducer'
import auth from './authReducer'

export default combineReducers({
  task,
  service,
  auth
})
