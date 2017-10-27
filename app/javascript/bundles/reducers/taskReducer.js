import {
  LISTS_SERVICE_TYPES,
  LISTS_SERVICES,
  EDIT_TASK,
  TASK_UPDATE,
  LISTS_TASKS,
  REMOVE_TASK
} from '../constants/taskConstants';

const initialState = {
  task: {title: '', service: {}},
  tasks: [],
  services: [],
  serviceTypes: []
}

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case TASK_UPDATE:
      return {
        ...state,
        task: action.payload,
        tasks: state.tasks.map(task => {
          if (task.id !== action.payload.id) {
            return task;
          }
          return {
            ...task,
            title: action.payload.title
          };
        }),
        services: []
      };
    case EDIT_TASK:
      return {...state, task: action.payload};
    case LISTS_TASKS:
      return {...state, tasks: action.payload};
    case REMOVE_TASK:
      return {...state, tasks: state.tasks.filter((task) => { return task.id != action.payload })};
    case LISTS_SERVICES:
      return {...state, services: action.payload};
    case LISTS_SERVICE_TYPES:
      return {...state, serviceTypes: action.payload};
    default:
      return state;
  }
};

export default taskReducer;
