import api from '../../config/axios';
import { AuthResponse } from '../../types/auth';

export const authService = {
  register: async (data: {
    email: string;
    password: string;
    full_name: string;
  }): Promise<{ message: string; userId: number }> => {
    return await api.post('/auth/register', data);
  },

  login: async (data: {
    email: string;
    password: string;
  }): Promise<AuthResponse> => {
    return await api.post('/auth/load', data);
  },

  logout: async (): Promise<{ message: string }> => {
    return await api.post('/auth/logout');
  },
};