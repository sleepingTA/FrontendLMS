import axiosInstance from '../config/axios';
import { ApiResponse, Category } from '../types/types';

export const getAllCategories = async (): Promise<Category[]> => {
  try {
    const response = await axiosInstance.get<ApiResponse<Category[]>>('/categories');
    console.log('Full API Response:', response.data); 
    
    return Array.isArray(response.data) ? response.data : response.data.data || [];
  } catch (error: any) {
    console.error('Error fetching categories:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
    });
    throw new Error('Failed to fetch categories: ' + (error.response?.data?.message || error.message));
  }
};

export const getCategoryById = async (id: number): Promise<Category | null> => {
  try {
    const response = await axiosInstance.get<ApiResponse<Category>>(`/categories/${id}`);
    return response.data.data || null;
  } catch (error) {
    throw new Error('Failed to fetch category');
  }
};

export const createCategory = async (name: string, description?: string): Promise<number> => {
  try {
    const response = await axiosInstance.post<ApiResponse<{ categoryId: number }>>('/categories', {
      name,
      description,
    });
    return response.data.data?.categoryId || 0;
  } catch (error) {
    throw new Error('Failed to create category');
  }
};

export const updateCategory = async (id: number, name: string, description?: string): Promise<void> => {
  try {
    await axiosInstance.put(`/categories/${id}`, { name, description });
  } catch (error) {
    throw new Error('Failed to update category');
  }
};

export const deleteCategory = async (id: number): Promise<void> => {
  try {
    await axiosInstance.delete(`/categories/${id}`);
  } catch (error) {
    throw new Error('Failed to delete category');
  }
};