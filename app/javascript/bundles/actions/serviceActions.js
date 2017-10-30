import axios from 'axios'

import {
  SET_SERVICE_ID,
  LISTS_SERVICES,
  LISTS_SERVICE_TYPES
} from '../constants/serviceConstants';

export const loadServices = (type) => {
  return (dispatch) => {
    axios.get(`/api/v1/services.json`, {
      params: {
        type: type
      }
    }).then((response) => {
      dispatch({
        type: LISTS_SERVICES,
        payload: response.data
      });
    });
  }
}

export const loadServiceTypes = () => {
  return (dispatch) => {
    axios.get(`/api/v1/services/types.json`).then((response) => {
      dispatch({
        type: LISTS_SERVICE_TYPES,
        payload: response.data
      });
    });
  }
}

export const setServiceId = (id) => ({
  type: SET_SERVICE_ID,
  payload: id
})
