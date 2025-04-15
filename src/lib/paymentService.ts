import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface PaymentPlan {
  id: string;
  name: string;
  price: number;
  duration: number; // em dias
  description: string;
}

export type PaymentMethod = 'credit_card' | 'crypto';

export class PaymentService {
  private static instance: PaymentService;
  private gateway: 'ccbill' = 'ccbill';
  private ccbillAccnum = import.meta.env.VITE_CCBILL_ACCNUM;
  private ccbillSubacc = import.meta.env.VITE_CCBILL_SUBACC;
  private ccbillFormName = import.meta.env.VITE_CCBILL_FORMNAME;

  private constructor() {}

  public static getInstance(): PaymentService {
    if (!PaymentService.instance) {
      PaymentService.instance = new PaymentService();
    }
    return PaymentService.instance;
  }

  async getPlans(): Promise<PaymentPlan[]> {
    const { data, error } = await supabase
      .from('plans')
      .select('*')
      .order('price');

    if (error) throw error;
    return data || [];
  }

  async initiatePayment(planId: string, userEmail: string, paymentMethod: PaymentMethod = 'credit_card'): Promise<string> {
    const { data: plan, error: planError } = await supabase
      .from('plans')
      .select('*')
      .eq('id', planId)
      .single();

    if (planError) throw planError;

    const baseUrl = 'https://bill.ccbill.com/jpost/signup.cgi';
    const params = new URLSearchParams({
      clientAccnum: this.ccbillAccnum,
      clientSubacc: this.ccbillSubacc,
      formName: this.ccbillFormName,
      formPrice: plan.price.toString(),
      formPeriod: plan.duration.toString(),
      formRecurringPrice: plan.price.toString(),
      formRecurringPeriod: plan.duration.toString(),
      formCurrency: 'USD',
      formEmail: userEmail,
      formDigest: this.generateDigest(plan.price, plan.duration)
    });

    if (paymentMethod === 'crypto') {
      params.append('formPaymentMethod', 'crypto');
      params.append('formCryptoProvider', 'bitpay');
    }

    return `${baseUrl}?${params.toString()}`;
  }

  private generateDigest(price: number, period: number): string {
    // Implemente a geração do digest conforme documentação do CCBill
    // Este é um exemplo simplificado
    const salt = import.meta.env.VITE_CCBILL_SALT;
    return btoa(`${price}${period}${salt}`);
  }

  async verifyPayment(paymentId: string): Promise<boolean> {
    const { data, error } = await supabase
      .from('payments')
      .select('*')
      .eq('payment_id', paymentId)
      .single();

    if (error) return false;
    return data?.status === 'completed';
  }

  async getCryptoPaymentStatus(paymentId: string): Promise<{
    status: 'pending' | 'completed' | 'failed';
    transactionHash?: string;
  }> {
    // Implemente a verificação do status do pagamento em cripto
    // Isso requer integração com a API do BitPay
    return {
      status: 'pending'
    };
  }
} 