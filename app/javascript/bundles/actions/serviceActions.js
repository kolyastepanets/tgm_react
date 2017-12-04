import api from '../services/api';

import {
  LISTS_SERVICES
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
