import { useState } from 'react';
import { AlertTriangle } from 'lucide-react';

interface AgeVerificationProps {
  onVerify: () => void;
}

export function AgeVerification({ onVerify }: AgeVerificationProps) {
  const [showModal, setShowModal] = useState(true);

  const handleVerify = () => {
    localStorage.setItem('ageVerified', 'true');
    onVerify();
    setShowModal(false);
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#1a1a1a] rounded-lg p-6 max-w-md w-full border border-[#E91E63]/20">
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle className="text-[#E91E63]" size={24} />
          <h2 className="text-xl font-semibold text-white">Verificação de Idade</h2>
        </div>
        
        <p className="text-white/80 mb-6">
          Este site contém conteúdo adulto artístico. Você confirma que tem pelo menos 18 anos de idade?
        </p>

        <div className="flex flex-col gap-3">
          <button
            onClick={handleVerify}
            className="w-full bg-[#E91E63] text-white py-3 rounded-lg font-medium hover:bg-[#E91E63]/90 transition-colors"
          >
            Sim, tenho 18 anos ou mais
          </button>
          
          <a
            href="https://www.google.com"
            className="w-full bg-white/10 text-white py-3 rounded-lg font-medium hover:bg-white/20 transition-colors text-center"
          >
            Não, tenho menos de 18 anos
          </a>
        </div>

        <p className="text-white/60 text-sm mt-4 text-center">
          Ao continuar, você concorda com nossos{' '}
          <a href="/termos" className="text-[#E91E63] hover:underline">
            Termos de Uso
          </a>
          {' '}e{' '}
          <a href="/privacidade" className="text-[#E91E63] hover:underline">
            Política de Privacidade
          </a>
        </p>
      </div>
    </div>
  );
}