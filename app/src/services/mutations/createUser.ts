import { api } from "../api";

export const createUser = async (name: string, email: string, password: string) => {
  try {
    const response = await api.post('/users/create', {
      name,
      email,
      password,
    });

    return response.data;
  } catch (error) {
    console.error(error);
  }
};