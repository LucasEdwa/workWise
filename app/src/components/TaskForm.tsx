import React, { useState, useContext } from 'react';
import { useMutation } from '@tanstack/react-query';
import { createTask } from '../services/mutations/createTasks';
import { TaskContext } from '../context/TaskContext';

const TaskForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('pending');
  const [assignedTo, setAssignedTo] = useState<string | null>(null);
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const context = useContext(TaskContext);

  if (!context) {
    return null;
  }

  const { dispatch } = context;

  const mutation = useMutation({
    mutationFn: createTask,
    onSuccess: (data) => {
      dispatch({ type: 'ADD_TASK', payload: data });
    },
    onError: (error: any) => {
      console.error('Error creating task:', error);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTask = {
      title,
      description,
      status,
      createdBy: 'admin', // Replace with actual user ID
      assignedTo,
      companyId: 'your-company-id', // Replace with actual company ID
      date: new Date(date),
      startTime,
      endTime,
    };
    mutation.mutate(newTask);
    setTitle('');
    setDescription('');
    setStatus('pending');
    setAssignedTo(null);
    setDate('');
    setStartTime('');
    setEndTime('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label>Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <label>Status</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <div>
        <label>Assigned To</label>
        <input
          type="text"
          value={assignedTo || ''}
          onChange={(e) => setAssignedTo(e.target.value)}
        />
      </div>
      <div>
        <label>Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div>
        <label>Start Time</label>
        <input
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
      </div>
      <div>
        <label>End Time</label>
        <input
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />
      </div>
      <button type="submit">Create Task</button>
    </form>
  );
};

export default TaskForm;