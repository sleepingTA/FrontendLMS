import axiosInstance from '../config/axios';
import { ApiResponse, Enrollment } from '../types/types';

export const getUserEnrollments = async (): Promise<Enrollment[]> => {
  try {
    const response = await axiosInstance.get<ApiResponse<Enrollment[]>>('/enrollments');
    return response.data.data || [];
  } catch (error) {
    throw new Error('Failed to fetch enrollments');
  }
};

export const checkEnrollment = async (courseId: number): Promise<Enrollment | null> => {
  try {
    const response = await axiosInstance.get<ApiResponse<Enrollment>>(`/courses/${courseId}/enrollment`);
    return response.data.data || null;
  } catch (error) {
    throw new Error('Failed to check enrollment');
  }
};

export const deleteEnrollment = async (enrollmentId: number): Promise<void> => {
  try {
    await axiosInstance.delete(`/enrollments/${enrollmentId}`);
  } catch (error) {
    throw new Error('Failed to delete enrollment');
  }
};