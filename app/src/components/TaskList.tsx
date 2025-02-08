import React, { useContext } from 'react';
import { TaskContext } from '../context/TaskContext';

const TaskList: React.FC = () => {
  const context = useContext(TaskContext);

  if (!context) {
    return null;
  }

  const { state, dispatch } = context;

  return (
    <div>
      <h2>Task List</h2>
      <ul>
        {state.tasks.map(task => (
          <li key={task.id}>
            {task.title} - {task.description}
            <button onClick={() => dispatch({ type: 'REMOVE_TASK', payload: task.id })}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;