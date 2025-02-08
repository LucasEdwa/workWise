import React, { createContext, useReducer, ReactNode } from 'react';
import { taskReducer, initialTaskState, TaskState, TaskAction } from '../reducers/TaskReducer';

interface TaskContextProps {
  state: TaskState;
  dispatch: React.Dispatch<TaskAction>;
}

export const TaskContext = createContext<TaskContextProps | undefined>(undefined);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(taskReducer, initialTaskState);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};