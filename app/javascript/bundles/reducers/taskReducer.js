import {
  EDIT_TASK,
  TASK_CREATE,
  TASK_UPDATE,
  LISTS_TASKS,
  REMOVE_TASK
} from '../constants/taskConstants';

const initialState = {
  task: {title: '', service: {}},
  tasks: []
}

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case TASK_CREATE:
      return {
        ...state,
        tasks: [...state.tasks, action.payload]
      };
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
    case EDIT_TASK:
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
