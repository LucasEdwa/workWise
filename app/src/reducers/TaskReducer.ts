import { Task } from '../models/Task';

export interface TaskState {
  tasks: Task[];
}

export type TaskAction =
  | { type: 'ADD_TASK'; payload: Task }
  | { type: 'REMOVE_TASK'; payload: string }
  | { type: 'UPDATE_TASK'; payload: Task };

export const initialTaskState: TaskState = {
  tasks: [],
};

export const taskReducer = (state: TaskState, action: TaskAction): TaskState => {
  switch (action.type) {
    case 'ADD_TASK':
      return { ...state, tasks: [...state.tasks, action.payload] };
    case 'REMOVE_TASK':
      return { ...state, tasks: state.tasks.filter(task => task.id !== action.payload) };
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task => (task.id === action.payload.id ? action.payload : task)),
      };
    default:
      return state;
  }
};