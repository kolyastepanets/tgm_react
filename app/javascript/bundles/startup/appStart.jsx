import React from 'react';
import { Provider } from 'react-redux';
import configureStore from '../store/rootStore';
import MainContainer from '../containers/MainContainer';

const AppStart = () => (
  <Provider store={configureStore()}>
    <MainContainer />
  </Provider>
);

export default AppStart;
