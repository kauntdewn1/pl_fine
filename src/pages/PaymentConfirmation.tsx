import React, { useState } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { Mail, MessageSquare } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { toast } from 'react-hot-toast';

export const PaymentConfirmation: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const email = searchParams.get('email');
  const plano = searchParams.get('plano');
  const [loading, setLoading] = useState(false);

  // Validação dos parâmetros
  if (!email || !plano || !['vip', 'basico'].includes(plano)) {
    return <Navigate to="/planos" replace />;
  }

  const handleChannelSelection = async (channel: 'telegram' | 'whatsapp' | 'email') => {
    setLoading(true);
    try {
      // Atualizar o canal de entrega no Supabase
      const { error } = await supabase
        .from('clientes_vip')
        .update({ canal_entrega: channel })
        .eq('email', email)
        .eq('plano', plano);

      if (error) throw error;

      // Redirecionar com base no canal selecionado
      const redirectUrls = {
        telegram: 'https://t.me/paulaVIPclub',
        whatsapp: `https://wa.me/553131931679?text=${encodeURIComponent(`Olá, acabei de fazer o pagamento do plano ${plano === 'vip' ? 'VIP' : 'Básico'}. Meu email é ${email}`)}`,
        email: `mailto:azevedomendespaula@gmail.com?subject=Acesso ${plano === 'vip' ? 'VIP' : 'Básico'}&body=Olá, acabei de fazer o pagamento do plano ${plano === 'vip' ? 'VIP' : 'Básico'}. Meu email é ${email}`,
      };

      window.location.href = redirectUrls[channel];
    } catch (error) {
      console.error('Erro ao registrar canal:', error);
      toast.error('Erro ao registrar sua preferência. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-text mb-4">Acesso Confirmado! 🎉</h1>
          <p className="text-xl text-text/80">
            Obrigada por sua assinatura! Escolha como deseja receber o conteúdo:
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {/* Email */}
          <button
            onClick={() => handleChannelSelection('email')}
            disabled={loading}
            className="flex items-center justify-center gap-4 p-6 bg-card rounded-lg shadow-lg hover:bg-card/80 transition-colors disabled:opacity-50"
            aria-label="Receber conteúdo por email"
          >
            <Mail className="text-accent" size={24} aria-hidden="true" />
            <span className="text-lg font-medium text-text">Receber por Email</span>
          </button>

          {/* WhatsApp */}
          <button
            onClick={() => handleChannelSelection('whatsapp')}
            disabled={loading}
            className="flex items-center justify-center gap-4 p-6 bg-card rounded-lg shadow-lg hover:bg-card/80 transition-colors disabled:opacity-50"
            aria-label="Receber conteúdo por WhatsApp"
          >
            <MessageSquare className="text-green-500" size={24} aria-hidden="true" />
            <span className="text-lg font-medium text-text">Receber por WhatsApp</span>
          </button>

          {/* Telegram */}
          <button
            onClick={() => handleChannelSelection('telegram')}
            disabled={loading}
            className="flex items-center justify-center gap-4 p-6 bg-card rounded-lg shadow-lg hover:bg-card/80 transition-colors disabled:opacity-50"
            aria-label="Receber conteúdo por Telegram"
          >
            <MessageSquare className="text-blue-500" size={24} aria-hidden="true" />
            <span className="text-lg font-medium text-text">Receber por Telegram</span>
          </button>
        </div>

        <div className="mt-8 text-center text-text/60">
          <p>Você receberá o acesso em até 24 horas após o contato.</p>
          <p className="mt-2">
            Em caso de dúvidas, entre em contato pelo email: azevedomendespaula@gmail.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentConfirmation;
