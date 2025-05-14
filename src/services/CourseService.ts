import axiosInstance, { getAllCourses, getCourseById } from '../config/axios';
import { ApiResponse, Course } from '../types/types';

export { getAllCourses, getCourseById };

export const getCourseDetails = async (id: number): Promise<Course | null> => {
  try {
    const response = await axiosInstance.get<ApiResponse<Course>>(`/courses/${id}/details`);
    return response.data.data || null;
  } catch (error) {
    throw new Error('Failed to fetch course details');
  }
};

export const createCourse = async (course: {
  title: string;
  description?: string;
  category_id: number;
  price: number;
  discount_percentage?: number;
  thumbnail_url?: string;
  is_active?: boolean;
}): Promise<number> => {
  try {
    const response = await axiosInstance.post<ApiResponse<{ courseId: number }>>('/courses', course, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data.data?.courseId || 0;
  } catch (error) {
    throw new Error('Failed to create course');
  }
};

export const updateCourse = async (
  id: number,
  course: {
    title?: string;
    description?: string;
    category_id?: number;
    price?: number;
    discount_percentage?: number;
    thumbnail_url?: string;
    is_active?: boolean;
  }
): Promise<void> => {
  try {
    await axiosInstance.put(`/courses/${id}`, course, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  } catch (error) {
    throw new Error('Failed to update course');
  }
};

export const deleteCourse = async (id: number): Promise<void> => {
  try {
    await axiosInstance.delete(`/courses/${id}`);
  } catch (error) {
    throw new Error('Failed to delete course');
  }
};