import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export function AgeVerification() {
  const navigate = useNavigate();
  const setAgeVerified = useAuthStore((state) => state.setAgeVerified);

  const handleAccept = () => {
    setAgeVerified(true);
    navigate('/');
  };

  const handleReject = () => {
    window.location.href = 'https://www.google.com';
  };

  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center z-50 p-4">
      <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl max-w-md w-full text-center text-black shadow-xl">
        <img 
          src="https://res.cloudinary.com/dt9m3pkjv/image/upload/v1743393385/PAULA_AZEVEDO_500_x_200_px_gd5l0v.png"
          alt="Paula Azevedo Logo"
          className="h-12 mx-auto mb-6"
        />
        <h2 className="text-2xl font-bold mb-6">Verificação de Idade</h2>
        <p className="mb-8">
          Este site contém conteúdo adulto (+18). 
          Ao clicar em "Confirmar", você declara que é maior de 18 anos.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={handleAccept}
            className="bg-accent hover:bg-accent-light text-white px-6 py-2 rounded-full transition-colors"
          >
            Confirmar
          </button>
          <button
            onClick={handleReject}
            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-full transition-colors"
          >
            Sair
          </button>
        </div>
      </div>
    </div>
  );
}