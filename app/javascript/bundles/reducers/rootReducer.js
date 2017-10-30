import { combineReducers } from 'redux'
import service from './serviceReducer'
import task from './taskReducer'

export default combineReducers({
  task,
  service
})
