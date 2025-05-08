import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Crown, Lock } from 'lucide-react';

const PLANOS = {
  basico: {
    nome: 'Plano Básico',
    preco: 29.9,
    descricao: 'Acesso ao conteúdo básico e exclusivo',
    openpixLink: 'https://openpix.com.br/pay/dca7fd01-bd6e-4a2d-bb7c-16f3ad07e8b2',
  },
  vip: {
    nome: 'Plano VIP',
    preco: 59.9,
    descricao: 'Acesso completo a todo o conteúdo exclusivo',
    openpixLink: 'https://openpix.com.br/pay/19b39aee-9a21-4568-bc59-2432a0b1912e',
  },
};

export default function PaymentPage() {
  const { plano } = useParams();
  const navigate = useNavigate();

  const getPlanDetails = () => {
    return PLANOS[plano as keyof typeof PLANOS];
  };

  const handlePayment = () => {
    const openpixLink = getPlanDetails()?.openpixLink;
    if (openpixLink) {
      window.location.href = openpixLink;
    }
  };

  if (!plano || !getPlanDetails()) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Plano não encontrado</h1>
          <button
            onClick={() => navigate('/planos')}
            className="bg-[#E91E63] text-white px-6 py-3 rounded-full hover:bg-[#E91E63]/90 transition-all"
          >
            Voltar para Planos
          </button>
        </div>
      </div>
    );
  }

  const planDetails = getPlanDetails();

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto">
          <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-8 border border-[#E91E63]/20 shadow-xl">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-[#E91E63]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Crown className="text-[#E91E63]" size={32} />
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">{planDetails.nome}</h1>
              <p className="text-white/60">{planDetails.descricao}</p>
            </div>

            <div className="space-y-6">
              <div className="text-center">
                <span className="text-4xl font-bold text-white">R$ {planDetails.preco}</span>
                <span className="text-white/60">/mês</span>
              </div>

              <button
                onClick={handlePayment}
                className="w-full bg-[#E91E63] text-white px-6 py-4 rounded-full hover:bg-[#E91E63]/90 transition-all flex items-center justify-center gap-2"
              >
                <Lock className="w-5 h-5" />
                Finalizar Pagamento
              </button>

              <p className="text-white/60 text-sm text-center">
                Ao clicar em "Finalizar Pagamento", você será redirecionado para a plataforma de
                pagamento segura do OpenPix.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
