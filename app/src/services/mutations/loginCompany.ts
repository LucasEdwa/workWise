import { api } from '../api';

interface LoginCompanyParams {
  organizationNumber: number;
  password: string;
}

export const loginCompany = async (params: LoginCompanyParams) => {
  try {
    const response = await api.post('/companies/login', params);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};