import React from 'react';
import { Provider } from 'react-redux';
import configureStore from '../store/taskStore';
import MainContainer from '../containers/MainContainer';

const AppStart = (props) => (
  <Provider store={configureStore(props)}>
    <MainContainer />
  </Provider>
);

export default AppStart;
