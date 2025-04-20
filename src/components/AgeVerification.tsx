import React from 'react';
import { useAuthStore } from '../store/authStore';
import { ImageWithFallback } from './ImageWithFallback';

export function AgeVerification() {
  const { setAgeVerified } = useAuthStore();

  const handleVerify = () => {
    setAgeVerified(true);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-black/40 backdrop-blur-lg p-8 rounded-2xl border border-[#E91E63]/20 shadow-lg">
        <div className="text-center mb-8">
          <ImageWithFallback
            src="https://res.cloudinary.com/dt9m3pkjv/image/upload/v1743393385/PAULA_AZEVEDO_500_x_200_px_gd5l0v.png"
            alt="Paula Azevedo"
            className="h-8 mx-auto mb-6"
            fallbackSrc="/logo-fallback.png"
          />
          <h2 className="text-2xl font-bold text-white mb-2">Verificação de Idade</h2>
          <p className="text-white/80">
            Este site contém conteúdo adulto e é destinado apenas para maiores de 18 anos.
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={handleVerify}
            className="w-full bg-[#E91E63] hover:bg-[#E91E63]/90 text-white py-3 px-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-[#E91E63]/20 hover:shadow-2xl transform hover:-translate-y-0.5"
          >
            Confirmo que sou maior de 18 anos
          </button>
          <a
            href="https://www.google.com"
            className="block w-full text-center py-3 px-4 text-white/60 hover:text-white transition-colors"
          >
            Sair
          </a>
        </div>

        <p className="mt-6 text-sm text-white/60 text-center">
          Ao prosseguir, você concorda com nossos{' '}
          <a href="/termos" className="text-[#E91E63] hover:text-[#E91E63]/90 transition-colors">
            Termos de Uso
          </a>{' '}
          e{' '}
          <a href="/privacidade" className="text-[#E91E63] hover:text-[#E91E63]/90 transition-colors">
            Política de Privacidade
          </a>
        </p>
      </div>
    </div>
  );
}