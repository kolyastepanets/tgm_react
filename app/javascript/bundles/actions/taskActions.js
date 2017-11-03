import api from '../services/api';
import $ from 'jquery';

import {
  INITIALIZE_TASK,
  TASK_CREATE_SUCCESS,
  TASK_CREATE_FAIL,
  TASK_UPDATE,
  LISTS_TASKS,
  REMOVE_TASK
} from '../constants/taskConstants';

export const loadTasks = () => {
  return dispatch => {
    return api()
    .get('/api/v1/tasks')
    .then(tasks => {
      dispatch({
        type: LISTS_TASKS,
        payload: tasks
      })
    })
    .catch(errors => {
      throw errors;
    })
  }
}

export const createTask = (serviceId, task) => {
  return dispatch => {
    return api()
    .post('/api/v1/tasks', {
      data: JSON.stringify({
        task: {
          title: task.title,
          service_id: serviceId,
          longtitude: task.longtitude,
          latitude: task.latitude
        }
      })
    })
    .then(task => {
      dispatch(successCreate(task));
      hideForm();
    })
    .catch(errors => {
      throw errors;
    })
  }
}

export const initializeTask = (task) => ({
  type: INITIALIZE_TASK,
  payload: task
})

export const updateTask = (id, serviceId, task) => {
  return dispatch => {
    return api()
    .put(`/api/v1/tasks/${id}`, {
      data: JSON.stringify({
        task: {
          title: task.title,
          service_id: serviceId,
          longtitude: task.longtitude,
          latitude: task.latitude
        }
      })
    })
    .then(task => {
      dispatch({
        type: TASK_UPDATE,
        payload: task
      });
      hideForm();
    })
    .catch(errors => {
      throw errors;
    })
  }
}

export const removeTask = (id) => {
  return dispatch => {
    return api()
    .delete(`/api/v1/tasks/${id}`)
    .then(() => {
      dispatch(successDelete(id));
    })
    .catch(errors => {
      throw errors;
    })
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
    payload: response
  };
}

const successDelete = (id) => {
  return {
    type: REMOVE_TASK,
    payload: id
  };
}

const clearErrors = () => {
  return {
    type: TASK_CREATE_FAIL,
    payload: {service: []}
  };
}
