import React from 'react';
import { Crown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Plans() {
  const navigate = useNavigate();

  const handlePlanSelection = (plan: 'basico' | 'vip') => {
    navigate(`/pagamento-solana?plano=${plan}`);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[40vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <img
            src="https://res.cloudinary.com/dt9m3pkjv/image/upload/v1743376994/PAULA/s6otfqus8lez0uz1acmg.png"
            alt="Paula Azevedo"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-light mb-2 text-white/90">
              Planos Exclusivos
            </h2>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              Escolha seu Acesso VIP
            </h1>
            <p className="text-xl text-white/90 mb-8 font-light">
              Conteúdo exclusivo e diferenciado para você.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Basic Plan */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                  <Crown className="text-accent" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Plano Básico</h3>
                  <p className="text-accent">R$29,90/mês</p>
                </div>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <span className="text-accent">✓</span>
                  Assinatura mensal para acesso a conteúdo adulto artístico
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-accent">✓</span>
                  Acesso imediato às minhas fotos
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-accent">✓</span>
                  1 vez por semana faço novas :)
                </li>
              </ul>
              <button
                onClick={() => handlePlanSelection('basico')}
                className="w-full bg-accent hover:bg-accent-light text-white px-6 py-3 rounded-full transition-colors shadow-lg shadow-accent/20"
              >
                Pagar com Solana
              </button>
            </div>

            {/* VIP Plan */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border-2 border-accent">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                  <Crown className="text-accent" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Plano VIP</h3>
                  <p className="text-accent">R$59,90/mês</p>
                </div>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <span className="text-accent">✓</span>
                  Assinatura mensal para acesso a conteúdo adulto artístico
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-accent">✓</span>
                  Acesso imediato às minhas fotos e vídeos
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-accent">✓</span>
                  1 vez por semana farei com carinho mais fotos e vídeos :)
                </li>
              </ul>
              <button
                onClick={() => handlePlanSelection('vip')}
                className="w-full bg-accent hover:bg-accent-light text-white px-6 py-3 rounded-full transition-colors shadow-lg shadow-accent/20"
              >
                Pagar com Solana
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}