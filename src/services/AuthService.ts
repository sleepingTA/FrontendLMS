import axiosInstance from '../config/axios';
import { ApiResponse, LoginResponse, User } from '../types/types';
import { auth, googleProvider, signInWithPopup } from '../config/firebase'; // Import từ file Firebase config

export const register = async (email: string, password: string, full_name: string): Promise<number> => {
  try {
    const response = await axiosInstance.post<ApiResponse<{ userId: number }>>('/auth/register', {
      email,
      password,
      full_name,
    });
    return response.data.data?.userId || 0;
  } catch (error) {
    throw new Error('Registration failed');
  }
};

export const verifyEmail = async (token: string): Promise<void> => {
  try {
    await axiosInstance.get(`/auth/verify-email/${token}`);
  } catch (error) {
    throw new Error('Email verification failed');
  }
};

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await axiosInstance.post<ApiResponse<LoginResponse>>('/auth/login', {
      email,
      password,
    });
    if (response.data.data) {
      localStorage.setItem('accessToken', response.data.data.accessToken);
      localStorage.setItem('refreshToken', response.data.data.refreshToken);
      localStorage.setItem('user', JSON.stringify(response.data.data.user));
      return response.data.data;
    }
    throw new Error('Login failed');
  } catch (error) {
    throw new Error('Login failed');
  }
};

export const googleLogin = async (): Promise<LoginResponse> => {
  try {
    // Thực hiện đăng nhập Google qua Firebase
    const result = await signInWithPopup(auth, googleProvider);
    const idToken = await result.user.getIdToken();

    // Gửi idToken tới server để xác thực
    const response = await axiosInstance.post<ApiResponse<LoginResponse>>('/auth/google-login', {
      idToken,
    });

    if (response.data.data) {
      localStorage.setItem('accessToken', response.data.data.accessToken);
      localStorage.setItem('refreshToken', response.data.data.refreshToken);
      localStorage.setItem('user', JSON.stringify(response.data.data.user));
      return response.data.data;
    }
    throw new Error('Google login failed');
  } catch (error) {
    throw new Error('Google login failed: ' + (error as Error).message);
  }
};

export const refreshToken = async (): Promise<void> => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) throw new Error('No refresh token');
    const response = await axiosInstance.post<ApiResponse<{ accessToken: string }>>('/auth/refresh-token', {
      refreshToken,
    });
    if (response.data.data) {
      localStorage.setItem('accessToken', response.data.data.accessToken);
    }
  } catch (error) {
    throw new Error('Token refresh failed');
  }
};

export const forgotPassword = async (email: string): Promise<void> => {
  try {
    await axiosInstance.post('/auth/forgot-password', { email });
  } catch (error) {
    throw new Error('Forgot password request failed');
  }
};

export const resetPassword = async (token: string, newPassword: string): Promise<void> => {
  try {
    await axiosInstance.post(`/auth/reset-password/${token}`, { newPassword });
  } catch (error) {
    throw new Error('Password reset failed');
  }
};

export const logout = async (): Promise<void> => {
  try {
    await axiosInstance.post('/auth/logout'); // Sửa lỗi typo từ '/ arrivare auth/logout' thành '/auth/logout'
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    // Đăng xuất khỏi Firebase
    await auth.signOut();
  } catch (error) {
    throw new Error('Logout failed');
  }
};

export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem('accessToken');
};

// Thêm hàm gửi lại email xác thực
export const resendVerificationEmail = async (email: string): Promise<void> => {
  try {
    await axiosInstance.post('/auth/resend-verification', { email });
  } catch (error) {
    throw new Error('Resend verification email failed');
  }
};