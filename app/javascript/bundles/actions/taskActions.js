import axios from 'axios'

import {
  INITIALIZE_TASK,
  TASK_CREATE_SUCCESS,
  TASK_CREATE_FAIL,
  TASK_UPDATE,
  LISTS_TASKS,
  REMOVE_TASK
} from '../constants/taskConstants';

export const loadTasks = () => {
  return (dispatch) => {
    axios.get(`/api/v1/tasks.json`).then((response) => {
      dispatch({
        type: LISTS_TASKS,
        payload: response.data
      });
    });
  }
}

export const createTask = (serviceId, state) => {
  return (dispatch) => {
    axios.post(`/api/v1/tasks`, {
        authenticity_token: ReactOnRails.authenticityToken(),
        task: {
          title: state.title,
          service_id: serviceId,
          longtitude: state.longtitude,
          latitude: state.latitude
        }
      })
      .then((response) => {
        dispatch(successCreate(response));
        dispatch(clearErrors());
        hideForm();
      })
      .catch((error) => {
        dispatch(showErrors(error));
      })
  }
}

export const initializeTask = (task) => ({
  type: INITIALIZE_TASK,
  payload: task
})

export const updateTask = (id, serviceId, state) => {
  return (dispatch) => {
    axios.put(`/api/v1/tasks/${id}`, {
      authenticity_token: ReactOnRails.authenticityToken(),
        task: {
          title: state.title,
          service_id: serviceId,
          longtitude: state.longtitude,
          latitude: state.latitude
        }
      })
      .then((response) => {
        dispatch({
          type: TASK_UPDATE,
          payload: response.data
        });
        hideForm();
      })
  }
}

export const removeTask = (id) => {
  return (dispatch) => {
    axios.delete(`/api/v1/tasks/${id}`).then((response) => {
      dispatch({
        type: REMOVE_TASK,
        payload: id
      });
    });
  }
}

const hideForm = () => {
  $('#new-task').animate({ 'right': '0' }, 'slow' );
}

const showErrors = (error) => {
  return {
    type: TASK_CREATE_FAIL,
    payload: error.response.data.errors
  }
}

const successCreate = (response) => {
  return {
    type: TASK_CREATE_SUCCESS,
    payload: response.data
  };
}

const clearErrors = () => {
  return {
    type: TASK_CREATE_FAIL,
    payload: {service: []}
  };
}
