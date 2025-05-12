import axios from 'axios';
import { ApiResponse, Course } from '../types';

const API_URL = 'http://localhost:3000/api';

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
axiosInstance.interceptors.request.use(
  (config) => {
      const token = localStorage.getItem('accessToken');
      if (token) {
          config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
  },
  (error) => {
      return Promise.reject(error);
  }
);

// Xử lý lỗi chung
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
      if (error.response?.status === 401) {
          try {
              // Thử refresh token
              const authService = (await import('../services/AuthService')).default;
              await authService.refreshToken();
          } catch (refreshError) {
              // Nếu refresh token thất bại, logout
              localStorage.removeItem('accessToken');
              localStorage.removeItem('refreshToken');
              localStorage.removeItem('user');
              window.location.href = '/auth';
          }
      }
      return Promise.reject(error);
  }
);
export const getAllCourses = async (): Promise<Course[]> => {
  try {
    const response = await axiosInstance.get<ApiResponse<Course[]>>('/courses');
    return response.data.success ? response.data.data : [];

  } catch (error) {
    console.error('Error fetching courses:', error);
    throw error;
  }
};
export const getCourseById = async (id: number): Promise<Course | null> => {
  try {
    const response = await axiosInstance.get<ApiResponse<Course>>(`/courses/${id}`);
    return response.data.success ? response.data.data : null;
  } catch (error) {
    console.error(`Error fetching course with id ${id}:`, error);
    throw error;
  }
};
export default axiosInstance;