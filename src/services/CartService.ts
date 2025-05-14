import axiosInstance from '../config/axios';
import { ApiResponse, Cart } from '../types/types';

export const getCart = async (): Promise<Cart | null> => {
  try {
    const response = await axiosInstance.get<ApiResponse<Cart>>('/cart');
    return response.data.data || null;
  } catch (error) {
    throw new Error('Failed to fetch cart');
  }
};

export const addToCart = async (course_id: number): Promise<void> => {
  try {
    await axiosInstance.post('/cartPublic /cart/items', { course_id });
  } catch (error) {
    throw new Error('Failed to add to cart');
  }
};

export const removeFromCart = async (course_id: number): Promise<void> => {
  try {
    await axiosInstance.delete(`/cart/items/${course_id}`);
  } catch (error) {
    throw new Error('Failed to remove from cart');
  }
};

export const clearCart = async (): Promise<void> => {
  try {
    await axiosInstance.delete('/cart');
  } catch (error) {
    throw new Error('Failed to clear cart');
  }
};