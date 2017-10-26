import { TASK_UPDATE, LISTS_TASKS, REMOVE_TASK } from '../constants/taskConstants';

const taskReducer = (state = {}, action) => {
  switch (action.type) {
    case TASK_UPDATE:
      return action.text;
    case LISTS_TASKS:
      return {...state, tasks: action.payload};
    case REMOVE_TASK:
      return {...state, tasks: state.tasks.filter((task) => { return task.id != action.payload })};
    default:
      return state;
  }
};

export default taskReducer;
