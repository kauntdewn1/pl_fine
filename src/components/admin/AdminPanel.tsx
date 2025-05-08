import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/hooks';

export function AdminPanel() {
  const navigate = useNavigate();
  const { adminLogout } = useApp();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleLogout = () => {
    adminLogout();
    navigate('/admin/login');
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'bx bxs-dashboard' },
    { id: 'posts', label: 'Posts', icon: 'bx bx-image' },
    { id: 'users', label: 'Usuários', icon: 'bx bx-user' },
    { id: 'settings', label: 'Configurações', icon: 'bx bx-cog' },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-surface border-r border-[#E91E63]/20 transition-all duration-300 ${
          isSidebarOpen ? 'w-64' : 'w-20'
        }`}
      >
        <div className="p-4 flex items-center justify-between">
          <h1 className={`text-xl font-bold text-[#E91E63] ${!isSidebarOpen && 'hidden'}`}>
            Admin Panel
          </h1>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-white/80 hover:text-white"
          >
            <i className={`bx ${isSidebarOpen ? 'bx-menu-alt-right' : 'bx-menu'} text-2xl`}></i>
          </button>
        </div>

        <nav className="mt-8">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => navigate(item.id)}
              className="w-full p-4 flex items-center text-white/80 hover:text-white hover:bg-[#E91E63]/10 transition-colors"
            >
              <i className={`${item.icon} text-2xl`}></i>
              {isSidebarOpen && <span className="ml-3">{item.label}</span>}
            </button>
          ))}

          <button
            onClick={handleLogout}
            className="w-full p-4 flex items-center text-white/80 hover:text-white hover:bg-[#E91E63]/10 transition-colors mt-auto"
          >
            <i className="bx bx-log-out text-2xl"></i>
            {isSidebarOpen && <span className="ml-3">Sair</span>}
          </button>
        </nav>
      </div>

      {/* Main content */}
      <div
        className={`flex-1 ${isSidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300 p-8`}
      >
        <div className="bg-surface rounded-lg p-6 border border-[#E91E63]/20">
          <h2 className="text-2xl font-semibold mb-6">Dashboard</h2>
          {/* Add your dashboard content here */}
        </div>
      </div>
    </div>
  );
}
