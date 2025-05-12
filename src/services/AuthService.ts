import axios from '../config/axios';
import { User, AuthResponse, AuthError } from '../types/auth';


class AuthService {

  async login(email: string, password: string): Promise<AuthResponse> {
    try {
      const response = await axios.post<AuthResponse>('/auth/login', { email, password });
      if (response.data.accessToken) {
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken || '');
        localStorage.setItem('user', JSON.stringify(response.data.user || {}));
      }
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }


  async register(email: string, password: string, fullName: string): Promise<AuthResponse> {
    try {
      const response = await axios.post<AuthResponse>('/auth/register', {
        email,
        password,
        full_name: fullName,
        is_active: 1,
        email_verified: false,
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }


  async googleLogin(idToken: string): Promise<AuthResponse> {
    try {
      const response = await axios.post<AuthResponse>('/auth/google-login', { idToken });
      if (response.data.accessToken) {
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken || '');
        localStorage.setItem('user', JSON.stringify(response.data.user || {}));
      }
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }


  async verifyEmail(token: string): Promise<AuthResponse> {
    try {
      const response = await axios.get<AuthResponse>(`/auth/verify-email/${token}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

 
  async forgotPassword(email: string): Promise<AuthResponse> {
    try {
      const response = await axios.post<AuthResponse>('/auth/forgot-password', { email });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }


  async resetPassword(token: string, newPassword: string): Promise<AuthResponse> {
    try {
      const response = await axios.post<AuthResponse>(`/auth/reset-password/${token}`, { newPassword });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }


  async refreshToken(): Promise<AuthResponse> {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) {
        throw new Error('No refresh token found');
      }

      const response = await axios.post<AuthResponse>('/auth/refresh-token', { refreshToken });
      if (response.data.accessToken) {
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken || refreshToken);
      }
      return response.data;
    } catch (error) {
      this.logout();
      throw this.handleError(error);
    }
  }


  async logout(): Promise<void> {
    try {
      await axios.post('/auth/logout');
    } catch (error) {
      console.warn('Logout request failed:', error);
    } finally {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
    }
  }


  private handleError(error: any): AuthError {
    if (error.response) {
      return {
        message: error.response.data.error || 'An error occurred',
        status: error.response.status,
      };
    }
    return {
      message: error.message || 'An error occurred',
      status: 0,
    };
  }


  isAuthenticated(): boolean {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    return !!(accessToken && refreshToken);
  }


  getUser(): User | null {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }
}

export default new AuthService();