import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PLANS } from '../constants';
import { usePayment } from '../hooks';
import { Plan } from '../types';

interface PaymentProps {
  plan: Plan;
}

export const Payment = ({ plan }: PaymentProps) => {
  const navigate = useNavigate();
  const { processPayment, loading, error } = usePayment();
  const [showQRCode, setShowQRCode] = useState(false);

  const handlePayment = async () => {
    try {
      await processPayment(plan.id);
      setShowQRCode(true);
    } catch (error) {
      console.error('Erro ao processar pagamento:', error);
    }
  };

  const handleCopyQRCode = () => {
    navigator.clipboard.writeText(plan.qrCode);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-4">
        Erro ao processar pagamento. Por favor, tente novamente.
      </div>
    );
  }

  return (
    <div className="bg-surface p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Pagamento via PIX</h2>
      
      {!showQRCode ? (
        <div className="space-y-4">
          <p className="text-text-secondary">
            Escolha como deseja pagar:
          </p>
          
          <div className="grid grid-cols-1 gap-4">
            <button
              onClick={() => window.open(plan.openpixLink, '_blank')}
              className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              Pagar via OpenPix
            </button>
            
            <button
              onClick={handlePayment}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              Mostrar QR Code PIX
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex justify-center">
            <img
              src={plan.qrCodeImage}
              alt="QR Code PIX"
              className="w-64 h-64 object-contain"
            />
          </div>
          
          <div className="flex justify-center space-x-4">
            <button
              onClick={handleCopyQRCode}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors"
            >
              Copiar Código PIX
            </button>
            
            <button
              onClick={() => navigate('/confirmacao')}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition-colors"
            >
              Já Paguei
            </button>
          </div>
        </div>
      )}
    </div>
  );
}; 