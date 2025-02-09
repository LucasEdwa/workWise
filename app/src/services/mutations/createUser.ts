import { User } from "../../models/User";
import { api } from "../api";

interface CreateUserParams {
  name: string;
  email: string;
  password: string;
  role: string;
  employeeNumber: number;
  companyId: string;
}

export const createUser = async (params: CreateUserParams) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }
    console.log('Sending token:', token);
    const response = await api.post<User>("/users/create", params, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};