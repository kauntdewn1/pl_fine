import { Navigate } from 'react-router-dom';
import { getLocalStorage } from '../../utils';

import React from 'react';

interface AdminRouteProps {
  children: React.ReactNode;
}

export const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const userEmail = getLocalStorage<string>('userEmail');

  if (!userEmail) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
};
