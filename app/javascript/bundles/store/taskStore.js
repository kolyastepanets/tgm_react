import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'

import taskReducer from '../reducers/taskReducer';

const configureStore = (initialState) => (
  createStore(
    taskReducer,
    initialState,
    applyMiddleware(thunk)
  )
);

export default configureStore;
