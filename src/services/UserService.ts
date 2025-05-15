import axiosInstance from '../config/axios';
import { ApiResponse, User } from '../types/types';

export const getAllUsers = async (): Promise<User[]> => {
  try {
    const response = await axiosInstance.get<ApiResponse<User[]>>('/users');
    return response.data.data || [];
  } catch (error) {
    throw new Error('Không thể lấy danh sách người dùng');
  }
};

export const getUserById = async (id: number): Promise<User | null> => {
  try {
    const response = await axiosInstance.get<ApiResponse<User>>(`/users/${id}`);
    return response.data.data || null;
  } catch (error) {
    throw new Error('Không thể lấy thông tin người dùng');
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
    throw new Error('Không thể tạo người dùng');
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
    throw new Error('Không thể cập nhật người dùng');
  }
};

export const updateAvatar = async (id: number, avatarFile: File): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append('avatar', avatarFile); // Tên field khớp với multer

    const response = await axiosInstance.patch<ApiResponse<{ avatar: string }>>(
      `/users/${id}/avatar`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return response.data.data?.avatar || '';
  } catch (error) {
    throw new Error('Không thể cập nhật avatar');
  }
};

export const deleteUser = async (id: number): Promise<void> => {
  try {
    await axiosInstance.delete(`/users/${id}`);
  } catch (error) {
    throw new Error('Không thể xóa người dùng');
  }
};

export const verifyEmail = async (id: number, verification_token: string): Promise<void> => {
  try {
    await axiosInstance.post('/users/verify-email', { id, verification_token });
  } catch (error) {
    throw new Error('Xác minh email thất bại');
  }
};