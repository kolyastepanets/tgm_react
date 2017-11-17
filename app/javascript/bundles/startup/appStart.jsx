import React from 'react';
import { Provider } from 'react-redux';
import configureStore from '../store/rootStore';
import MainContainer from '../containers/MainContainer';
import '../../../../node_modules/toastr/build/toastr.min.css';

const AppStart = () => (
  <Provider store={configureStore()}>
    <MainContainer />
  </Provider>
);

export default AppStart;
