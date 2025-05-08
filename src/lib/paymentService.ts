import type { Plan } from '@/types';
import { createClient } from '@supabase/supabase-js';
import { PLANS } from '@/constants';

const OPENPIX_API_URL = 'https://api.openpix.com.br/api/v1';
const OPENPIX_APP_ID: string = import.meta.env.VITE_OPENPIX_APP_ID || '';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

export const paymentService = {
  async getPlans() {
    try {
      const { data: plans, error } = await supabase.from('plans').select('*');

      if (error) {
        throw error;
      }

      return plans;
    } catch (error) {
      console.error('Erro ao buscar planos:', error);
      throw error;
    }
  },

  async createPayment(planId: string, userEmail: string) {
    try {
      const plan = Object.values(PLANS).find((p: Plan) => p.id === planId);
      if (!plan) {
        throw new Error('Plano não encontrado');
      }

      const params = new URLSearchParams();
      params.append('appId', OPENPIX_APP_ID);
      params.append('value', plan.price.toString());
      params.append('correlationID', `${planId}-${Date.now()}`);
      params.append('description', `Assinatura ${plan.name}`);
      params.append('payerEmail', userEmail);

      const response = await fetch(`${OPENPIX_API_URL}/charge`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${import.meta.env.VITE_OPENPIX_API_KEY}`,
        },
        body: params,
      });

      if (!response.ok) {
        throw new Error('Erro ao criar pagamento');
      }

      const data = await response.json();

      // Gerar QR Code
      const qrCodeResponse = await fetch(`${OPENPIX_API_URL}/qrcode-static`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${btoa(`${OPENPIX_APP_ID}:`)}`,
        },
        body: JSON.stringify({
          correlationID: data.correlationID,
          value: plan.price,
        }),
      });

      if (!qrCodeResponse.ok) {
        throw new Error('Erro ao gerar QR Code');
      }

      const qrCodeData = await qrCodeResponse.json();

      return {
        ...data,
        qrCodeImage: qrCodeData.qrCodeImage,
        qrCodeText: qrCodeData.qrCodeText,
      };
    } catch (error) {
      console.error('Erro ao criar pagamento:', error);
      throw error;
    }
  },

  async checkPaymentStatus(_paymentId: string) {
    try {
      // Implementar verificação de status do pagamento
      return {
        status: 'pending',
      };
    } catch (error) {
      console.error('Erro ao verificar status do pagamento:', error);
      throw error;
    }
  },
};
