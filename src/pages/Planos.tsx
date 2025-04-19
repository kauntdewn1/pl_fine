import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { toast } from 'react-hot-toast';

export const Planos: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const navigate = useNavigate();

  const handlePlanSelect = async (plan: string) => {
    try {
      setLoading(true);
      setSelectedPlan(plan);

      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast.error('Por favor, faça login para continuar');
        navigate('/login');
        return;
      }

      // Verificar se o usuário já tem uma assinatura ativa
      const { data: existingSubscription } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', session.user.id)
        .eq('status', 'active')
        .single();

      if (existingSubscription) {
        toast.error('Você já possui uma assinatura ativa');
        return;
      }

      // Redirecionar para a página de pagamento
      navigate(`/pagamento?plano=${plan}&email=${session.user.email}`);
    } catch (error) {
      console.error('Erro ao selecionar plano:', error);
      toast.error('Ocorreu um erro ao processar sua solicitação');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-text mb-8 text-center">Escolha seu Plano</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-card p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-text mb-4">Básico</h2>
            <p className="text-text/80 mb-4">Acesso a conteúdo básico</p>
            <button
              onClick={() => handlePlanSelect('basico')}
              disabled={loading}
              className="w-full bg-accent text-white py-2 px-4 rounded hover:bg-accent/90 transition-colors disabled:opacity-50"
              aria-label="Selecionar plano básico"
            >
              {loading && selectedPlan === 'basico' ? 'Processando...' : 'Selecionar'}
            </button>
          </div>

          <div className="bg-card p-6 rounded-lg shadow-lg border-2 border-accent">
            <h2 className="text-2xl font-semibold text-text mb-4">Premium</h2>
            <p className="text-text/80 mb-4">Acesso a conteúdo premium</p>
            <button
              onClick={() => handlePlanSelect('premium')}
              disabled={loading}
              className="w-full bg-accent text-white py-2 px-4 rounded hover:bg-accent/90 transition-colors disabled:opacity-50"
              aria-label="Selecionar plano premium"
            >
              {loading && selectedPlan === 'premium' ? 'Processando...' : 'Selecionar'}
            </button>
          </div>

          <div className="bg-card p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-text mb-4">VIP</h2>
            <p className="text-text/80 mb-4">Acesso a conteúdo exclusivo VIP</p>
            <button
              onClick={() => handlePlanSelect('vip')}
              disabled={loading}
              className="w-full bg-accent text-white py-2 px-4 rounded hover:bg-accent/90 transition-colors disabled:opacity-50"
              aria-label="Selecionar plano VIP"
            >
              {loading && selectedPlan === 'vip' ? 'Processando...' : 'Selecionar'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Planos; 