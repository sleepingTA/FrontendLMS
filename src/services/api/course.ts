import api from '../../config/axios';
import {
  Course,
  CourseDetail,
  CreateCourseResponse,
  AddContentResponse,
} from '../../types/course';

// Định nghĩa kiểu cho response của API
interface CoursesResponse {
  success: boolean;
  data: Course[];
}

export const courseService = {
  getAllCourses: async (): Promise<Course[]> => {
    const response = await api.get<CoursesResponse>('/courses');
    return response.data.data; // Trích xuất mảng từ response.data.data
  },
  getCourseById: async (id: number): Promise<CourseDetail> => {
    return await api.get(`/courses/${id}`);
  },
  createCourse: async (data: FormData): Promise<CreateCourseResponse> => {
    return await api.post('/courses', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  updateCourse: async (
    id: number,
    data: FormData
  ): Promise<CreateCourseResponse> => {
    return await api.put(`/courses/${id}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  deleteCourse: async (
    id: number
  ): Promise<{ success: boolean; message: string }> => {
    return await api.delete(`/courses/${id}`);
  },
  addVideo: async (
    lessonId: number,
    data: FormData
  ): Promise<AddContentResponse> => {
    return await api.post(`/courses/lessons/${lessonId}/videos`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  addMaterial: async (
    lessonId: number,
    data: FormData
  ): Promise<AddContentResponse> => {
    return await api.post(`/courses/lessons/${lessonId}/materials`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};