import { api } from '../api';

interface CreateTaskParams {
  title: string;
  description: string;
  status: string;
  createdBy: string;
  assignedTo: string | null;
  companyId: string;
  date: Date;
  startTime: string;
  endTime: string;
}

export const createTask = async (params: CreateTaskParams) => {
  try {
    const response = await api.post('/tasks/create', params);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};