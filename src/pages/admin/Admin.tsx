import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminPanel } from '../../components/admin/AdminPanel';

export default function Admin() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <AdminPanel />
    </div>
  );
} 