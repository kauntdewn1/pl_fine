import { Navigate } from 'react-router-dom';
import { getLocalStorage } from '../../utils';

interface AdminRouteProps {
  children: React.ReactNode;
}

export const AdminRoute = ({ children }: AdminRouteProps) => {
  const isAdmin = getLocalStorage<boolean>('isAdmin');

  if (!isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
}; 