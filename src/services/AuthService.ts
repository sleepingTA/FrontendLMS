import axiosInstance from '../config/axios';
import { ApiResponse, LoginResponse, User } from '../types/types';
import { auth, googleProvider, signInWithPopup } from '../config/firebase'; 

export const register = async (fullName: string, email: string, password: string) => {
  const response = await axiosInstance.post('/auth/register', {
    full_name: fullName,
    email,
    password,
  });
  
  return response.data;
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
    const result = await signInWithPopup(auth, googleProvider);
    const idToken = await result.user.getIdToken();
    console.log('Firebase idToken:', idToken); 

    const response = await axiosInstance.post<ApiResponse<LoginResponse>>('/auth/google-login', {
      idToken,
    });
    console.log('Response from /auth/google-login:', response.data); 

    if (response.data.data) {
      localStorage.setItem('accessToken', response.data.data.accessToken);
      localStorage.setItem('refreshToken', response.data.data.refreshToken);
      localStorage.setItem('user', JSON.stringify(response.data.data.user));
      return response.data.data;
    }
    throw new Error('Đăng nhập Google thất bại: Không nhận được dữ liệu từ server');
  } catch (error) {
    console.error('Lỗi đăng nhập Google:', error);
    if (typeof error === 'object' && error !== null && 'response' in error) {
     
      console.error('Server response:', (error as any).response.data);
    }
    throw new Error(`Đăng nhập Google thất bại: ${(error as Error).message}`);
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
    await axiosInstance.post('/auth/logout'); 
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
   
    await auth.signOut();
  } catch (error) {
    throw new Error('Logout failed');
  }
};

export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem('accessToken');
};


export const resendVerificationEmail = async (email: string): Promise<void> => {
  try {
    await axiosInstance.post('/auth/resend-verification', { email });
  } catch (error) {
    throw new Error('Resend verification email failed');
  }
};