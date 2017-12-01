import React from 'react';
import { Provider } from 'react-redux';
import configureStore from '../store/rootStore';
import { Router, browserHistory } from 'react-router';
import createRoutes from '../routes/routes';

const store = configureStore();
const routes = createRoutes(store);

const AppStart = () => (
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>
);

export default AppStart;
