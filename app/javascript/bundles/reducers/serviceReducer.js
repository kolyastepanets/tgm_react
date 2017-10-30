import {
  LISTS_SERVICE_TYPES,
  LISTS_SERVICES,
  SET_SERVICE_ID
} from '../constants/serviceConstants';

const initialState = {
  services: [],
  serviceId: null,
  serviceTypes: []
}

const serviceReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SERVICE_ID:
      return {...state, serviceId: action.payload};
    case LISTS_SERVICES:
      return {...state, services: action.payload};
    case LISTS_SERVICE_TYPES:
      return {...state, serviceTypes: action.payload};
    default:
      return state;
  }
};

export default serviceReducer;
