import React, { useState } from 'react';
import { Crown } from 'lucide-react';
import { GUMROAD_PRODUCTS } from '../lib/gumroad';

export default function Plans() {
  const [email, setEmail] = useState('');
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'basico' | 'vip' | null>(null);

  const handlePlanClick = (plan: 'basico' | 'vip') => {
    setSelectedPlan(plan);
    setShowEmailInput(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !selectedPlan) return;

    const product = GUMROAD_PRODUCTS[selectedPlan];
    const redirectUrl = `${window.location.origin}/confirmacao?email=${encodeURIComponent(email)}&plano=${selectedPlan}`;
    const gumroadUrl = `${product.url}?wanted=true&email=${encodeURIComponent(email)}&redirect_url=${encodeURIComponent(redirectUrl)}`;
    
    window.location.href = gumroadUrl;
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-text mb-8">Planos Disponíveis</h1>
        </div>

        {showEmailInput ? (
          <div className="max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="bg-card rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-text mb-4">Quase lá!</h2>
              <p className="text-text/80 mb-6">Digite seu email para continuar com a compra do plano {selectedPlan === 'vip' ? 'VIP' : 'Básico'}:</p>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Seu melhor email"
                className="w-full px-4 py-2 rounded-md border border-gray-300 mb-4"
                required
              />
              <button
                type="submit"
                className="w-full bg-accent text-white py-3 px-4 rounded-md hover:bg-accent/90 transition-colors"
              >
                Continuar para o pagamento
              </button>
              <button
                type="button"
                onClick={() => setShowEmailInput(false)}
                className="w-full mt-2 text-text/60 hover:text-text"
              >
                Voltar
              </button>
            </form>
          </div>
        ) : (
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2">
            {/* Plano Básico */}
            <div className="bg-card rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-text mb-4">Plano Básico</h2>
              <p className="text-text mb-6">Acesso ao conteúdo básico</p>
              <div className="text-3xl font-bold text-accent mb-6">R${GUMROAD_PRODUCTS.basico.price}</div>
              <button
                onClick={() => handlePlanClick('basico')}
                className="w-full bg-accent text-white py-3 px-4 rounded-md hover:bg-accent/90 transition-colors"
              >
                Assinar Plano Básico
              </button>
            </div>

            {/* Plano VIP */}
            <div className="bg-card rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-text mb-4">Plano VIP</h2>
              <p className="text-text mb-6">Acesso ao conteúdo exclusivo VIP</p>
              <div className="text-3xl font-bold text-accent mb-6">R${GUMROAD_PRODUCTS.vip.price}</div>
              <button
                onClick={() => handlePlanClick('vip')}
                className="w-full bg-accent text-white py-3 px-4 rounded-md hover:bg-accent/90 transition-colors"
              >
                Assinar Plano VIP
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}