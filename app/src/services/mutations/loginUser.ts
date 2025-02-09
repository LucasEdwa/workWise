import { api } from "../api";

interface LoginParams {
  email: string;
  password: string;
}

export const loginUser = async (params: LoginParams): Promise<{ token: string }> => {
  try {
    const response = await api.post<{ token: string }>("/users/login", params);
    const token = response.data.token;
    return { token };
  } catch (error) {
    console.error(error);
    throw error;
  }
};