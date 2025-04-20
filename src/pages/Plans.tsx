import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Plans() {
  const navigate = useNavigate();

  const handlePlanSelect = (plan: string) => {
    navigate(`/pagamento/${plan}`);
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Escolha seu Plano</h1>
          <p className="text-text/80 max-w-2xl mx-auto">
            Selecione o plano que melhor atende às suas necessidades e comece sua jornada conosco hoje mesmo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Plano Básico */}
          <div className="bg-card rounded-lg shadow-lg p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">Plano Básico</h2>
              <p className="text-4xl font-bold text-accent mb-2">R$29,90/mês</p>
              <p className="text-text/80">Acesso ao conteúdo básico</p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <span className="text-accent">✓</span>
                <span>Acesso ao conteúdo básico</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-accent">✓</span>
                <span>Atualizações semanais</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-accent">✓</span>
                <span>Suporte por email</span>
              </div>
            </div>

            <button
              onClick={() => handlePlanSelect('basico')}
              className="w-full bg-accent hover:bg-accent-dark text-white font-medium py-3 px-6 rounded-full transition-colors shadow-lg shadow-accent/20"
            >
              Selecionar Plano
            </button>
          </div>

          {/* Plano VIP */}
          <div className="bg-card rounded-lg shadow-lg p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">Plano VIP</h2>
              <p className="text-4xl font-bold text-accent mb-2">R$59,90/mês</p>
              <p className="text-text/80">Acesso ao conteúdo VIP</p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <span className="text-accent">✓</span>
                <span>Acesso ao conteúdo VIP</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-accent">✓</span>
                <span>Atualizações diárias</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-accent">✓</span>
                <span>Suporte prioritário</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-accent">✓</span>
                <span>Conteúdo exclusivo</span>
              </div>
            </div>

            <button
              onClick={() => handlePlanSelect('vip')}
              className="w-full bg-accent hover:bg-accent-dark text-white font-medium py-3 px-6 rounded-full transition-colors shadow-lg shadow-accent/20"
            >
              Selecionar Plano
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}