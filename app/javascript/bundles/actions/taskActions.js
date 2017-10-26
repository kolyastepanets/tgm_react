import axios from 'axios'

import {
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
