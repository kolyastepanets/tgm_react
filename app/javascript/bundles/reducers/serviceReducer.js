import {
  LISTS_SERVICES
} from '../constants/serviceConstants';

const initialState = {
  services: []
}

const serviceReducer = (state = initialState, action) => {
  switch (action.type) {
    case LISTS_SERVICES:
      return {...state, services: action.payload};
    default:
      return state;
  }
};

export default serviceReducer;
