import axios from 'axios'

import {
  EDIT_TASK,
  TASK_CREATE,
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

export const createTask = (serviceId, title) => {
  return (dispatch) => {
    axios.post(`/api/v1/tasks`, {
        authenticity_token: ReactOnRails.authenticityToken(),
        task: {
          title: title,
          service_id: serviceId
        }
      })
      .then((response) => {
        dispatch({
          type: TASK_CREATE,
          payload: response.data
        });
        hideForm();
        clearErrors();
        // crear form
      })
      .catch((error) => {
        clearErrors();
        showErrors(error);
      })
  }
}

export const editTask = (task) => ({
  type: EDIT_TASK,
  payload: task
})

export const updateTask = (id, serviceId, title) => {
  return (dispatch) => {
    axios.put(`/api/v1/tasks/${id}`, {
      authenticity_token: ReactOnRails.authenticityToken(),
        task: {
          title: title,
          service_id: serviceId
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
  let errors = error.response.data.errors;
  if (errors.service.length) {
    $('.service-errors').removeClass('hidden');
    $.each(errors, (key, val) => {
      $(".service-errors").append(`<li>${val[0]}</li>`);
    });
  }
}

const clearErrors = () => {
  $('.service-errors').addClass('hidden');
  $('.service-errors').empty();
}
