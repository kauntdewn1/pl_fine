import React, { useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Lock, Send, MessageSquare, Mail, Zap } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function Planos() {
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
    try {
      const form = document.getElementById('canalForm') as HTMLFormElement;
      if (!form) return;

      const canalInput = document.getElementById('canal_entrega') as HTMLInputElement;
      if (canalInput) canalInput.value = canal;

      const formData = new FormData(form);
      const dados = Object.fromEntries(formData);

      const { error } = await supabase
        .from('clientes_vip')
        .insert([dados]);

      if (error) throw error;

      // Redirecionar com base no canal selecionado
      const redirectUrls = {
        telegram: 'https://t.me/PaulaAzevedo_Bot?start=vip',
        whatsapp: 'https://wa.me/553131931679?text=Quero+acesso+VIP+confirmado',
        email: 'mailto:suporte@paulaazevedo.site?subject=Acesso%20VIP&body=Confirmado'
      };

      window.location.href = redirectUrls[canal];
    } catch (error) {
      console.error('Erro ao registrar canal:', error);
      toast.error('Erro ao registrar sua escolha. Tente novamente.');
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-black/40 backdrop-blur-lg p-8 rounded-2xl border border-[#E91E63]/20 shadow-lg shadow-[#E91E63]/10">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">💖</div>
          <h1 className="text-3xl font-bold text-[#E91E63] mb-2">Acesso Confirmado!</h1>
          <p className="text-white/80">
            Escolha como deseja receber seu conteúdo VIP:
          </p>
        </div>

        <form id="canalForm" className="space-y-4">
          <input type="hidden" name="email" id="email" />
          <input type="hidden" name="telegram_id" />
          <input type="hidden" name="whatsapp" />
          <input type="hidden" name="canal_entrega" id="canal_entrega" />
          <input type="hidden" name="status" value="pago" />
          <input type="hidden" name="plano" id="plano" />
        </form>

        <div className="space-y-4">
          <button
            onClick={() => enviarCanal('telegram')}
            className="w-full bg-[#E91E63] hover:bg-[#E91E63]/90 text-white py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-[#E91E63]/20 hover:shadow-2xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            <Send size={20} />
            <span>Receber via Telegram</span>
          </button>

          <button
            onClick={() => enviarCanal('whatsapp')}
            className="w-full bg-[#E91E63] hover:bg-[#E91E63]/90 text-white py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-[#E91E63]/20 hover:shadow-2xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            <MessageSquare size={20} />
            <span>Receber via WhatsApp</span>
          </button>

          <button
            onClick={() => enviarCanal('email')}
            className="w-full bg-[#E91E63] hover:bg-[#E91E63]/90 text-white py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-[#E91E63]/20 hover:shadow-2xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            <Mail size={20} />
            <span>Receber por E-mail</span>
          </button>
        </div>

        <div className="mt-12 pt-8 border-t border-[#E91E63]/10">
          <h2 className="text-2xl font-bold text-[#E91E63] mb-2 text-center flex items-center justify-center gap-2">
            <Lock size={24} />
            <span>Pagar com Pix via Solalapay</span>
          </h2>
          <p className="text-white/60 text-sm text-center mb-6">
            Clique abaixo para pagar com Pix de forma segura e automática.
          </p>
          <a
            href="https://pagamento.solalapay.com/paula-vip"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-[#E91E63] hover:bg-[#E91E63]/90 text-white py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-[#E91E63]/20 hover:shadow-2xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            <Zap size={20} />
            <span>Finalizar Pagamento</span>
          </a>
        </div>
      </div>
    </div>
  );
} 