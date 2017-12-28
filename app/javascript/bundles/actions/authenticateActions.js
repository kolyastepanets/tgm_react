import api from '../services/api';

import {
  SIGN_IN_SUCCESS,
  SIGN_IN_FAIL,
  SIGN_OUT_SUCCESS,
  SIGN_UP_SUCCESS
} from '../constants/authenticateConstants';

export const signIn = (email, password) => {
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

export const signUp = (email, password, confirm_password) => {
  return dispatch => {
    return api()
    .post('/auth/', {
      data: JSON.stringify({
        email: email,
        password: password,
        confirm_password: confirm_password
      })
    })
    .then(() => {
      dispatch(signUpSuccess());
    })
    .catch(errors => {
      throw errors;
    });
  };
}

export const signOut = () => {
  return dispatch => {
    return api()
    .delete('/auth/sign_out')
    .then(() => {dispatch(successSignOut());})
    .catch(errors => {
      throw errors;
    });
  };
}

export const validateToken = () => {
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

export const successSignOut = () => {
  return {
    type: SIGN_OUT_SUCCESS,
    payload: false
  };
}

export const signUpSuccess = () => {
  return {
    type: SIGN_UP_SUCCESS,
    payload: true
  };
}
