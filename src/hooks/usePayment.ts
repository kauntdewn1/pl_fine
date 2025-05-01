import { useState } from 'react';
import { PLANS } from '../constants';
import { setLocalStorage, getLocalStorage } from '../utils';

interface PaymentHistory {
  id: string;
  planId: string;
  status: 'pending' | 'paid' | 'failed';
  createdAt: string;
}

export const usePayment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const processPayment = async (planId: string) => {
    setLoading(true);
    setError(null);

    try {
      const plan = Object.values(PLANS).find(p => p.id === planId);
      
      if (!plan) {
        throw new Error('Plano não encontrado');
      }

      // Obtém histórico de pagamentos
      const paymentHistory = getLocalStorage<PaymentHistory[]>('paymentHistory') || [];

      // Cria novo registro de pagamento
      const newPayment: PaymentHistory = {
        id: crypto.randomUUID(),
        planId: plan.id,
        status: 'pending',
        createdAt: new Date().toISOString(),
      };

      // Adiciona ao histórico
      const updatedHistory = [...paymentHistory, newPayment];
      setLocalStorage('paymentHistory', updatedHistory);

      // Salva informações do plano no localStorage
      setLocalStorage('selectedPlan', {
        id: plan.id,
        name: plan.name,
        price: plan.price,
        openpixLink: plan.openpixLink,
        qrCode: plan.qrCode,
        qrCodeImage: plan.qrCodeImage,
      });

      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao processar pagamento');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const checkPaymentStatus = (planId: string) => {
    const payments = getLocalStorage<PaymentHistory[]>('paymentHistory') || [];
    const lastPayment = payments.find(p => p.planId === planId);
    return lastPayment?.status || 'pending';
  };

  return {
    processPayment,
    checkPaymentStatus,
    loading,
    error,
  };
}; 