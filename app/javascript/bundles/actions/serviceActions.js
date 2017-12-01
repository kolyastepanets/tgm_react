import api from '../services/api';

import {
  SET_SERVICE_ID,
  LISTS_SERVICES,
  LISTS_SERVICE_TYPES
} from '../constants/serviceConstants';

export const loadServices = (type) => {
  return dispatch => {
    return api()
    .get(`/api/v1/services?type=${type}`)
    .then(services => {
      dispatch({
        type: LISTS_SERVICES,
        payload: services
      })
    }).catch(errors => {
      throw errors;
    });
  };
}

export const loadServiceTypes = () => {
  return dispatch => {
    return api()
    .get('/api/v1/services/types')
    .then(serviceTypes => {
      dispatch({
        type: LISTS_SERVICE_TYPES,
        payload: serviceTypes
      })
    }).catch(errors => {
      throw errors;
    })
  };
}

export const setServiceId = (id) => ({
  type: SET_SERVICE_ID,
  payload: id
})
