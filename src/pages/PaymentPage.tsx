import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Crown, AlertCircle, Zap } from 'lucide-react';

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
          features: [
            'Acesso ao conteúdo básico',
            'Atualizações semanais',
            'Suporte por email'
          ],
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
            'Conteúdo exclusivo'
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
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-black/40 backdrop-blur-sm rounded-2xl p-8 border border-[#E91E63]/20 text-center">
          <AlertCircle className="w-12 h-12 text-[#E91E63] mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-4">Plano não encontrado</h1>
          <button
            onClick={() => navigate('/planos')}
            className="inline-flex justify-center items-center px-6 py-3 text-base font-medium rounded-full text-white bg-[#E91E63] hover:bg-[#E91E63]/90 transition-all duration-300 shadow-lg hover:shadow-[#E91E63]/20 hover:shadow-2xl transform hover:-translate-y-0.5"
          >
            Voltar para Planos
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[#E91E63] blur-[120px] opacity-5"></div>
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-8 border border-[#E91E63]/20 shadow-xl relative z-10">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-[#E91E63]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Crown className="text-[#E91E63]" size={32} />
                </div>
                <h1 className="text-3xl font-bold text-white mb-2">Confirme seu Pagamento</h1>
                <p className="text-white/60">Você está prestes a adquirir o {planDetails.name}</p>
              </div>
              
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-white">{planDetails.name}</h2>
                  <p className="text-2xl font-bold text-[#E91E63]">{planDetails.price}/mês</p>
                </div>
                
                <div className="space-y-3 mb-8">
                  {planDetails.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-white/80">
                      <span className="text-[#E91E63]">✓</span>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-xl mb-6 flex items-center gap-2">
                  <AlertCircle size={20} />
                  <span>{error}</span>
                </div>
              )}

              <div className="space-y-4">
                <button
                  onClick={handlePayment}
                  disabled={loading}
                  className="w-full inline-flex justify-center items-center px-6 py-4 text-base font-medium rounded-full text-white bg-[#E91E63] hover:bg-[#E91E63]/90 transition-all duration-300 shadow-lg hover:shadow-[#E91E63]/20 hover:shadow-2xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed gap-2"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/20 border-t-white"></div>
                      <span>Processando...</span>
                    </>
                  ) : (
                    <>
                      <Crown size={20} />
                      <span>Finalizar Pagamento</span>
                    </>
                  )}
                </button>

                <a
                  href="https://pagamento.solalapay.com/paula-vip"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex justify-center items-center px-6 py-4 text-base font-medium rounded-full text-white bg-black/40 hover:bg-black/60 transition-all duration-300 border border-[#E91E63]/20 hover:border-[#E91E63]/40 gap-2"
                >
                  <Zap size={20} className="text-[#E91E63]" />
                  <span>Pagar com PIX</span>
                </a>
              </div>

              <p className="mt-6 text-sm text-white/60 text-center">
                Ao clicar em "Finalizar Pagamento", você será redirecionado para a plataforma de pagamento segura do Gumroad.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage; 