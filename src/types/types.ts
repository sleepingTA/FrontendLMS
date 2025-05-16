// src/types/types.ts
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

// User
export interface User {
  id: number;
  email: string;
  full_name: string;
  role: 'User' | 'Admin';
  avatar?: string;
  is_active?: boolean;
}

// Auth
export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

// Category
export interface Category {
  id: number;
  name: string;
  description?: string;
}

// Course
export interface Course {
  id: number;
  title: string;
  description?: string;
  category_id: number;
  created_by: number;
  price: number;
  discount_percentage?: number;
  thumbnail_url?: string;
  is_active: boolean;
  total_students?: number;
  avg_rating?: number;
  total_reviews?: number;
  views?: number;
  created_at?: string;
  updated_at?: string;
}

// Lesson
export interface Lesson {
  id: number;
  course_id: number;
  title: string;
  description?: string;
  order_number: number;
  videos?: Video[];
  materials?: Material[];
}

export interface Video {
  id: number;
  lesson_id: number;
  title: string;
  description?: string;
  video_url: string;
  order_number: number;
  duration?: number;
  is_preview: boolean;
}

export interface Material {
  id: number;
  lesson_id: number;
  title: string;
  file_url: string;
  file_type: string;
}

// Payment
export interface Payment {
  id: number;
  user_id: number;
  cart_id: number;
  payment_method: string;
  amount: number;
  status: 'Pending' | 'Success' | 'Failed';
  transaction_id?: string;
  payment_date?: string;
}

// Review
export interface Review {
  id: number;
  user_id: number;
  course_id: number;
  rating: number;
  comment?: string;
  is_approved: boolean;
  created_at?: string;
}

// Cart
export interface Cart {
  id: number;
  user_id: number;
  items: CartItem[];
}

export interface CartItem {
  course_id: number;
  course_title: string;
  price: number;
  discounted_price?: number;
}

// Enrollment
export interface Enrollment {
  id: number;
  user_id: number;
  course_id: number;
  enrollment_date: string;
}
// types.ts
export interface LoginResponse {
  success: boolean;
  data: {
    accessToken: string;
    refreshToken: string;
    user: {
      id: number;
      email: string;
      full_name: string;
      role: string;
    };
  };
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  userId?: number; // Tùy thuộc vào response từ backend
}