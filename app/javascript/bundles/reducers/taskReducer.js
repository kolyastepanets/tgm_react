import {
  INITIALIZE_TASK,
  TASK_CREATE_SUCCESS,
  TASK_CREATE_FAIL,
  TASK_UPDATE,
  LISTS_TASKS,
  REMOVE_TASK
} from '../constants/taskConstants';

const initialState = {
  task: {title: '', service: {}},
  tasks: [],
  errors: {service: []}
}

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case TASK_CREATE_SUCCESS:
      return {
        ...state,
        tasks: [...state.tasks, action.payload]
      };
    case TASK_CREATE_FAIL:
      return {...state, errors: action.payload};
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
            title: action.payload.title,
            service: action.payload.service
          };
        })
      };
    case INITIALIZE_TASK:
      return {...state, task: action.payload};
    case LISTS_TASKS:
      return {...state, tasks: action.payload};
    case REMOVE_TASK:
      return {...state, tasks: state.tasks.filter((task) => { return task.id != action.payload })};
    default:
      return state;
  }
};

export default taskReducer;
