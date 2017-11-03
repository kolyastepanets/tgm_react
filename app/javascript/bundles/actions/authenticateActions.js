import api from '../services/api';

import {
  SIGN_IN_SUCCESS,
  SIGN_IN_FAIL,
} from '../constants/authenticateConstants';

export function signIn(email, password) {
  return dispatch => {
    return api()
    .post('/auth/sign_in', {
      data: JSON.stringify({
        email: email,
        password: password
      })
    })
    .then(() => {
      dispatch(successSignIn())
    })
    .catch(errors => {
      throw errors;
    });
  };
}

export function validateToken() {
  return dispatch => {
    return api()
    .get('/auth/validate_token')
    .then(() => {
      dispatch(successSignIn());
    }).catch(() => {
      dispatch(failSignIn());
    })
  };
}

export const failSignIn = () => {
  return {
    type: SIGN_IN_FAIL,
    payload: false
  }
}

export const successSignIn = () => {
  return {
    type: SIGN_IN_SUCCESS,
    payload: true
  };
}
