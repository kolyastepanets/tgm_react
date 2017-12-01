import {
  SIGN_IN_SUCCESS,
  SIGN_IN_FAIL,
  SIGN_OUT_SUCCESS,
  SIGN_UP_SUCCESS
} from '../constants/authenticateConstants';

const initialState = {
  user: {
    email: ''
  },
  signInErrors: [],
  loggedIn: false
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN_SUCCESS:
      return {...state, loggedIn: action.payload};
    case SIGN_IN_FAIL:
      return {...state, loggedIn: action.payload};
    case SIGN_OUT_SUCCESS:
      return {...state, loggedIn: action.payload};
    case SIGN_UP_SUCCESS:
      return {...state, loggedIn: action.payload};
    default:
      return state;
  }
};

export default authReducer;
