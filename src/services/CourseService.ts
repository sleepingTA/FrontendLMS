import axiosInstance from '../config/axios'; 
import { ApiResponse, Course } from '../types/types';

export const getAllCourses = async (): Promise<Course[]> => {
  try {
    const response = await axiosInstance.get<Course[]>('http://localhost:3000/api/courses');
    console.log('API Response:', response.data);
    const coursesData = Array.isArray(response.data) ? response.data : [];
    return coursesData;
  } catch (error: any) {
    console.error('Error fetching courses:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data
    });
    throw new Error('Failed to fetch courses: ' + (error.response?.data?.message || error.message));
  }
};

export const getCourseById = async (id: number): Promise<Course | null> => {
  try {
    console.log(`getCourseById called with id: ${id}, Type: ${typeof id}`);
    if (isNaN(id)) {
      throw new Error('ID không hợp lệ');
    }
    const response = await axiosInstance.get(`/courses/${id}`);
    const data = response.data;
    if (data) {
      if (data.success !== undefined) {
        return data.success && data.data ? data.data : null;
      }
      return data || null;
    }
    return null;
  } catch (error) {
    console.error(`Error fetching course with id ${id}:`, error);
    throw error;
  }
};

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