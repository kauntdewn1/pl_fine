import React, { useEffect } from 'react';
import { Send, MessageCircle, Mail } from 'lucide-react';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_API_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export default function Autenticar() {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get('email') || '';
    const plano = urlParams.get('plano') || '';

    const emailInput = document.getElementById('email');
    const planoInput = document.getElementById('plano');
    if (emailInput) emailInput.value = email;
    if (planoInput) planoInput.value = plano;
  }, []);

  async function enviarCanal(canal: 'telegram' | 'whatsapp' | 'email') {
    document.getElementById('canal_entrega')!.setAttribute('value', canal);
    const form = document.getElementById('canalForm') as HTMLFormElement;
    const dados = Object.fromEntries(new FormData(form));

    try {
      const resposta = await fetch(`${SUPABASE_URL}/rest/v1/clientes_vip`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_API_KEY,
          'Authorization': `Bearer ${SUPABASE_API_KEY}`
        },
        body: JSON.stringify(dados)
      });

      if (resposta.ok) {
        const redirectUrls = {
          telegram: 'https://t.me/PaulaAzevedo_Bot?start=vip',
          whatsapp: 'https://wa.me/553131931679?text=Quero+acesso+VIP+confirmado',
          email: 'mailto:suporte@paulaazevedo.site?subject=Acesso%20VIP&body=Confirmado'
        };
        window.location.href = redirectUrls[canal];
      } else {
        throw new Error('Erro ao registrar canal');
      }
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao registrar sua escolha. Tente novamente.');
    }
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-md w-full bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
        <div className="text-center">
          <div className="text-5xl mb-4">💖</div>
          <h1 className="text-3xl font-bold mb-2 text-accent">Acesso Confirmado!</h1>
          <p className="text-lg mb-8 text-gray-600">
            Como você prefere receber seu conteúdo VIP?
          </p>

          <form id="canalForm">
            <input type="hidden" name="email" id="email" value="" />
            <input type="hidden" name="telegram_id" />
            <input type="hidden" name="whatsapp" />
            <input type="hidden" name="canal_entrega" id="canal_entrega" value="" />
            <input type="hidden" name="status" value="pago" />
            <input type="hidden" name="plano" id="plano" value="" />
          </form>

          <div className="space-y-4">
            {/* Botão Telegram */}
            <button
              onClick={() => enviarCanal('telegram')}
              className="flex items-center justify-center gap-2 w-full bg-accent hover:bg-accent/90 text-white px-6 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <Send size={20} />
              <span className="font-medium">Receber via Telegram</span>
            </button>

            {/* Botão WhatsApp */}
            <button
              onClick={() => enviarCanal('whatsapp')}
              className="flex items-center justify-center gap-2 w-full bg-accent hover:bg-accent/90 text-white px-6 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <MessageCircle size={20} />
              <span className="font-medium">Receber via WhatsApp</span>
            </button>

            {/* Botão E-mail */}
            <button
              onClick={() => enviarCanal('email')}
              className="flex items-center justify-center gap-2 w-full bg-accent hover:bg-accent/90 text-white px-6 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <Mail size={20} />
              <span className="font-medium">Receber por E-mail</span>
            </button>
          </div>

          <div className="mt-12 border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-bold text-accent mb-4">💳 Pagar com Pix via Solalapay</h2>
            <p className="text-gray-600 mb-6">
              Clique abaixo para pagar com Pix de forma segura e automática.
            </p>
            <a
              href="https://pagamento.solalapay.com/paula-vip"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full bg-accent hover:bg-accent/90 text-white px-6 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <span className="font-medium">⚡ Finalizar Pagamento</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 