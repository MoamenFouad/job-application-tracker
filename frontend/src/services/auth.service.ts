// Franco: da el auth service - hena bne3mel el API calls bta3et el auth
import api from './api';
import type { User, ApiResponse } from '../types';

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput extends LoginInput {
  name: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export const loginUser = async (input: LoginInput): Promise<AuthResponse> => {
  const { data } = await api.post<ApiResponse<AuthResponse>>('/auth/login', input);
  return data.data!;
};

export const registerUser = async (input: RegisterInput): Promise<AuthResponse> => {
  const { data } = await api.post<ApiResponse<AuthResponse>>('/auth/register', input);
  return data.data!;
};
