import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'
import rootReducer from '../reducers/rootReducer';
import persistState from 'redux-localstorage'

const configureStore = () => (
  createStore(
    rootReducer,
    compose(
      applyMiddleware(thunk),
      persistState()
    )
  )
);

export default configureStore;
