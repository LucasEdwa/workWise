import { api } from '../api';

interface CreateCompanyParams {
  name: string;
  address: string;
  organizationNumber: number;
  password: string;
}

export const createCompany = async (params: CreateCompanyParams) => {
  try {
    const response = await api.post('/companies/create', params);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};