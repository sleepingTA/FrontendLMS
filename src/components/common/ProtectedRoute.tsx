import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import authService from '../services/AuthService';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();

  if (!authService.isAuthenticated()) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;