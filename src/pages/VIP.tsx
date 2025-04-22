import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Crown } from 'lucide-react';

export const VIP: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          navigate('/planos');
          return;
        }

        // Verificar se o usuário tem acesso VIP
        const { data: subscription, error } = await supabase
          .from('subscriptions')
          .select('*')
          .eq('user_id', session.user.id)
          .eq('plan', 'vip')
          .eq('status', 'active')
          .single();

        if (error || !subscription) {
          navigate('/planos');
          return;
        }

        setIsAuthenticated(true);
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
        navigate('/planos');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Crown className="text-accent" size={32} />
          <h1 className="text-4xl font-bold text-text">Área VIP</h1>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Content Grid */}
          {Array.from({ length: 6 }).map((_, index) => (
            <div 
              key={index}
              className="bg-card rounded-lg shadow-lg p-6 hover:bg-card/80 transition-colors cursor-pointer"
            >
              <div className="aspect-video bg-accent/10 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-accent">Conteúdo Exclusivo {index + 1}</span>
              </div>
              <h3 className="text-xl font-semibold text-text mb-2">Título do Conteúdo {index + 1}</h3>
              <p className="text-text/80">
                Descrição breve do conteúdo exclusivo disponível para assinantes.
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default VIP;