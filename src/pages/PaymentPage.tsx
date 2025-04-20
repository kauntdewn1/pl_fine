import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const PaymentPage: React.FC = () => {
  const { plan } = useParams<{ plan: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!plan) {
      navigate('/planos');
      return;
    }
  }, [plan, navigate]);

  const handlePayment = () => {
    setLoading(true);
    try {
      const gumroadLink = getPlanDetails()?.gumroadLink;
      if (gumroadLink) {
        window.location.href = gumroadLink;
      } else {
        throw new Error('Link de pagamento não encontrado');
      }
    } catch (err) {
      setError('Ocorreu um erro ao processar o pagamento. Por favor, tente novamente.');
      console.error('Payment error:', err);
    } finally {
      setLoading(false);
    }
  };

  const getPlanDetails = () => {
    switch (plan) {
      case 'basic':
        return {
          name: 'Plano Básico',
          price: 'R$ 29,90',
          features: ['Acesso ao conteúdo básico', 'Atualizações semanais', 'Suporte por email'],
          gumroadLink: 'https://paulaazevedo.gumroad.com/l/basiquinha'
        };
      case 'vip':
        return {
          name: 'Plano VIP',
          price: 'R$ 59,90',
          features: [
            'Acesso ao conteúdo VIP',
            'Atualizações diárias',
            'Suporte prioritário',
            'Conteúdo exclusivo',
          ],
          gumroadLink: 'https://paulaazevedo.gumroad.com/l/vip'
        };
      default:
        return null;
    }
  };

  const planDetails = getPlanDetails();

  if (!planDetails) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-text mb-4">Plano não encontrado</h1>
          <button
            onClick={() => navigate('/planos')}
            className="bg-accent text-white px-4 py-2 rounded-lg hover:bg-accent/90 transition-colors"
          >
            Voltar para Planos
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-card rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-text mb-6">Confirme seu Pagamento</h1>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-text mb-2">{planDetails.name}</h2>
            <p className="text-2xl font-bold text-accent mb-4">{planDetails.price}/mês</p>
            
            <ul className="space-y-2 mb-6">
              {planDetails.features.map((feature, index) => (
                <li key={index} className="flex items-center text-text/80">
                  <svg
                    className="w-5 h-5 text-accent mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <button
            onClick={handlePayment}
            disabled={loading}
            className="w-full bg-accent text-white px-6 py-3 rounded-lg hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Processando...' : 'Finalizar Pagamento'}
          </button>

          <p className="mt-4 text-sm text-text/60 text-center">
            Ao clicar em "Finalizar Pagamento", você será redirecionado para a plataforma de pagamento segura do Gumroad.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage; 