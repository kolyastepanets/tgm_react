import React from 'react';
import { Route, IndexRoute } from 'react-router';
import MainContainer from '../containers/MainContainer';
import SignInForm from '../components/SignInForm';
import SignUpForm from '../components/SignUpForm';
import AppHome from '../components/AppHome';

export default (store) => {
  const requireAuth = (nextState, replace, callback) => {
    const { auth: { loggedIn }} = store.getState();
    if (!loggedIn) {
      if (nextState.location.hash === '#/signup' || nextState.location.hash === '#/signin') {
        replace({
          pathname: nextState.location.hash,
          state: { nextPathname: nextState.location.pathname }
        });
      } else {
        replace({
          pathname: '#/signin',
          state: { nextPathname: nextState.location.pathname }
        });
      }
    }
    callback();
  };

  const redirectAuth = (nextState, replace, callback) => {
    const { auth: { loggedIn }} = store.getState();
    if (loggedIn) {
      replace({
        pathname: '/'
      });
    }
    callback();
  };

  return (
    <Route path="/" component={MainContainer}>
      <IndexRoute component={AppHome} onEnter={requireAuth}/>
      <Route path="#/signin" component={SignInForm} onEnter={redirectAuth}/>
      <Route path="#/signup" component={SignUpForm} onEnter={redirectAuth}/>
    </Route>
  );
};
