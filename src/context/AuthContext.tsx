// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { isAuthenticated as checkAuth } from '../services/AuthService';

// Định nghĩa kiểu cho user (dựa trên dữ liệu từ LoginResponse trong types)
interface User {
  id: string;
  email: string;
  full_name: string;
  role: string;
  avatar?: string;
}

// Định nghĩa kiểu cho AuthContext
interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  setAuth: (isAuthenticated: boolean, user: User | null) => void;
}

// Tạo event emitter để đồng bộ trạng thái
export const authEventEmitter = {
  listeners: [] as Array<() => void>,
  emit: function () {
    console.log('authEventEmitter emitted'); // Debug
    this.listeners.forEach((listener) => listener());
  },
  subscribe: function (listener: () => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  },
};

// Tạo AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Khởi tạo trạng thái ban đầu
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => checkAuth());
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('user');
    try {
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error('Lỗi khi parse user từ localStorage:', error);
      return null;
    }
  });

  // Hàm cập nhật trạng thái xác thực
  const updateAuthStatus = useCallback(() => {
    console.log('updateAuthStatus called'); // Debug
    const authStatus = checkAuth();
    console.log('authStatus:', authStatus); // Debug

    // Cập nhật trạng thái isAuthenticated
    setIsAuthenticated(authStatus);

    // Nếu đã xác thực, lấy user từ localStorage
    if (authStatus) {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
        } catch (error) {
          console.error('Lỗi khi parse user từ localStorage:', error);
          setUser(null);
          // Xóa localStorage nếu dữ liệu không hợp lệ
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('user');
        }
      } else {
        setUser(null);
        // Nếu không có user nhưng isAuthenticated là true, xóa token để đồng bộ
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setIsAuthenticated(false);
      }
    } else {
      setUser(null);
    }
  }, []);

  // Lắng nghe sự kiện từ authEventEmitter
  useEffect(() => {
    // Cập nhật trạng thái ban đầu
    updateAuthStatus();

    // Đăng ký lắng nghe sự kiện
    const unsubscribe = authEventEmitter.subscribe(updateAuthStatus);

    // Cleanup khi component unmount
    return () => {
      unsubscribe();
    };
  }, [updateAuthStatus]);

  // Hàm setAuth để cập nhật trạng thái từ bên ngoài
  const setAuth = useCallback((auth: boolean, userData: User | null) => {
    console.log('setAuth called:', { auth, userData }); // Debug
    setIsAuthenticated(auth);
    setUser(userData);

    // Đồng bộ localStorage với trạng thái
    if (auth && userData) {
      localStorage.setItem('user', JSON.stringify(userData));
    } else {
      localStorage.removeItem('user');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    }

    // Phát sự kiện để đồng bộ
    authEventEmitter.emit();
  }, []);

  // Giá trị context
  const value: AuthContextType = {
    isAuthenticated,
    user,
    setAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook để sử dụng AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth phải được sử dụng trong AuthProvider');
  }
  return context;
};