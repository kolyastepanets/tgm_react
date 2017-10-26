import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'

import taskReducer from '../reducers/taskReducer';

const configureStore = (railsProps) => (
  createStore(
    taskReducer,
    railsProps,
    applyMiddleware(thunk)
  )
);

export default configureStore;
