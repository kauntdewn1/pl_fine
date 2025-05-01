import { WebhookPayload } from '../types';
import { PLANS } from '../constants';
import { setLocalStorage, getLocalStorage } from '../utils';

interface PaymentData {
  status: string;
  transactionId: string;
  createdAt: string;
  plan: {
    id: string;
    name: string;
    price: number;
  };
  email?: string;
}

export const handleWebhook = async (payload: WebhookPayload) => {
  try {
    const { status, transaction_id, created_at, email } = payload;

    // Verifica se o pagamento foi aprovado
    if (status !== 'PAID') {
      throw new Error('Pagamento não aprovado');
    }

    // Encontra o plano correspondente
    const plan = Object.values(PLANS).find(p => p.id === transaction_id);
    
    if (!plan) {
      throw new Error('Plano não encontrado');
    }

    // Obtém pagamentos existentes
    const existingPayments = getLocalStorage<PaymentData[]>('payments') || [];

    // Cria novo registro de pagamento
    const newPayment: PaymentData = {
      status: 'PAID',
      transactionId: transaction_id,
      createdAt: created_at,
      plan: {
        id: plan.id,
        name: plan.name,
        price: plan.price,
      },
      email,
    };

    // Adiciona novo pagamento à lista
    const updatedPayments = [...existingPayments, newPayment];

    // Salva lista atualizada
    setLocalStorage('payments', updatedPayments);

    // Salva último pagamento para referência rápida
    setLocalStorage('lastPayment', newPayment);

    return {
      success: true,
      message: 'Pagamento processado com sucesso',
    };
  } catch (error) {
    console.error('Erro ao processar webhook:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Erro ao processar pagamento',
    };
  }
}; 