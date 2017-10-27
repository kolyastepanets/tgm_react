import axios from 'axios'

import {
  EDIT_TASK,
  TASK_UPDATE,
  LISTS_TASKS,
  REMOVE_TASK,
  LISTS_SERVICES,
  LISTS_SERVICE_TYPES
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

export const editTask = (task) => ({
  type: EDIT_TASK,
  payload: task,
})

export const updateTask = (id, title) => {
  return (dispatch) => {
    axios.put(`/api/v1/tasks/${id}`, {
      authenticity_token: ReactOnRails.authenticityToken(),
      task: {
        title: title
      }
    }).then((response) => {
      dispatch({
        type: TASK_UPDATE,
        payload: response.data
      });
    }).then(() => {
      $('#new-task').animate({ 'right': '0' }, 'slow' );
    });
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
