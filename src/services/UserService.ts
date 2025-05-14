import axiosInstance from '../config/axios';
import { ApiResponse, User } from '../types/types';

export const getAllUsers = async (): Promise<User[]> => {
  try {
    const response = await axiosInstance.get<ApiResponse<User[]>>('/users');
    return response.data.data || [];
  } catch (error) {
    throw new Error('Failed to fetch users');
  }
};

export const getUserById = async (id: number): Promise<User | null> => {
  try {
    const response = await axiosInstance.get<ApiResponse<User>>(`/users/${id}`);
    return response.data.data || null;
  } catch (error) {
    throw new Error('Failed to fetch user');
  }
};

export const createUser = async (user: {
  email: string;
  password: string;
  full_name: string;
  role?: string;
  avatar?: string;
}): Promise<number> => {
  try {
    const response = await axiosInstance.post<ApiResponse<{ userId: number }>>('/users', user);
    return response.data.data?.userId || 0;
  } catch (error) {
    throw new Error('Failed to create user');
  }
};

export const updateUser = async (
  id: number,
  user: {
    email?: string;
    password?: string;
    full_name?: string;
    role?: string;
    avatar?: string;
  }
): Promise<void> => {
  try {
    await axiosInstance.put(`/users/${id}`, user);
  } catch (error) {
    throw new Error('Failed to update user');
  }
};

export const updateAvatar = async (id: number, avatar: string): Promise<void> => {
  try {
    await axiosInstance.patch(`/users/${id}/avatar`, { avatar });
  } catch (error) {
    throw new Error('Failed to update avatar');
  }
};

export const deleteUser = async (id: number): Promise<void> => {
  try {
    await axiosInstance.delete(`/users/${id}`);
  } catch (error) {
    throw new Error('Failed to delete user');
  }
};

export const verifyEmail = async (id: number, verification_token: string): Promise<void> => {
  try {
    await axiosInstance.post('/users/verify-email', { id, verification_token });
  } catch (error) {
    throw new Error('Email verification failed');
  }
};