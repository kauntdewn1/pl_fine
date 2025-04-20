import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Lock, Send, MessageSquare, Mail, Zap, Crown, AlertCircle, ArrowRight } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function Plans() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get('email') || '';
    const plano = urlParams.get('plano') || '';

    const emailInput = document.getElementById('email') as HTMLInputElement;
    const planoInput = document.getElementById('plano') as HTMLInputElement;
    if (emailInput) emailInput.value = email;
    if (planoInput) planoInput.value = plano;
  }, []);

  async function enviarCanal(canal: 'telegram' | 'whatsapp' | 'email') {
    try {
      setLoading(true);
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

      const redirectUrls = {
        telegram: 'https://t.me/PaulaAzevedo_Bot?start=vip',
        whatsapp: 'https://wa.me/553131931679?text=Quero+acesso+VIP+confirmado',
        email: 'mailto:suporte@paulaazevedo.site?subject=Acesso%20VIP&body=Confirmado'
      };

      window.location.href = redirectUrls[canal];
    } catch (error) {
      console.error('Erro ao registrar canal:', error);
      toast.error('Erro ao registrar sua escolha. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  const handlePlanSelect = (plan: string) => {
    navigate(`/pagamento/${plan}`);
  };

  const urlParams = new URLSearchParams(window.location.search);
  const isConfirmation = urlParams.get('email') && urlParams.get('plano');

  if (isConfirmation) {
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
                  <h1 className="text-3xl font-bold text-white mb-2">Acesso Confirmado!</h1>
                  <p className="text-white/60">
                    Escolha como deseja receber seu conteúdo VIP:
                  </p>
                </div>

                <form id="canalForm" className="hidden">
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
                        <Send className="w-5 h-5" />
                        <span>Receber no Telegram</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => enviarCanal('whatsapp')}
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
                        <MessageSquare className="w-5 h-5" />
                        <span>Receber no WhatsApp</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => enviarCanal('email')}
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
                        <Mail className="w-5 h-5" />
                        <span>Receber por Email</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[#E91E63] blur-[120px] opacity-5"></div>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-white mb-4">Escolha seu Plano</h1>
              <p className="text-white/60 text-lg">
                Selecione o plano que melhor atende às suas necessidades
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-8 border border-[#E91E63]/20 shadow-xl relative z-10">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-[#E91E63]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="text-[#E91E63]" size={32} />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">Plano Básico</h2>
                  <p className="text-white/60">Para quem quer começar</p>
                </div>

                <ul className="space-y-4 mb-8">
                  <li className="flex items-center text-white/80">
                    <Lock className="w-5 h-5 text-[#E91E63] mr-2" />
                    Acesso básico ao conteúdo
                  </li>
                  <li className="flex items-center text-white/80">
                    <Lock className="w-5 h-5 text-[#E91E63] mr-2" />
                    Suporte por email
                  </li>
                  <li className="flex items-center text-white/80">
                    <Lock className="w-5 h-5 text-[#E91E63] mr-2" />
                    Atualizações mensais
                  </li>
                </ul>

                <div className="text-center mb-6">
                  <span className="text-4xl font-bold text-white">R$ 29,90</span>
                  <span className="text-white/60">/mês</span>
                </div>

                <button
                  onClick={() => handlePlanSelect('basico')}
                  className="w-full inline-flex justify-center items-center px-6 py-4 text-base font-medium rounded-full text-white bg-[#E91E63] hover:bg-[#E91E63]/90 transition-all duration-300 shadow-lg hover:shadow-[#E91E63]/20 hover:shadow-2xl transform hover:-translate-y-0.5"
                >
                  <span>Selecionar Plano</span>
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
              </div>

              <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-8 border border-[#E91E63]/20 shadow-xl relative z-10">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-[#E91E63]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Crown className="text-[#E91E63]" size={32} />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">Plano VIP</h2>
                  <p className="text-white/60">Para quem quer o melhor</p>
                </div>

                <ul className="space-y-4 mb-8">
                  <li className="flex items-center text-white/80">
                    <Lock className="w-5 h-5 text-[#E91E63] mr-2" />
                    Acesso completo ao conteúdo
                  </li>
                  <li className="flex items-center text-white/80">
                    <Lock className="w-5 h-5 text-[#E91E63] mr-2" />
                    Suporte prioritário
                  </li>
                  <li className="flex items-center text-white/80">
                    <Lock className="w-5 h-5 text-[#E91E63] mr-2" />
                    Atualizações semanais
                  </li>
                  <li className="flex items-center text-white/80">
                    <Lock className="w-5 h-5 text-[#E91E63] mr-2" />
                    Conteúdo exclusivo
                  </li>
                </ul>

                <div className="text-center mb-6">
                  <span className="text-4xl font-bold text-white">R$ 99,90</span>
                  <span className="text-white/60">/mês</span>
                </div>

                <button
                  onClick={() => handlePlanSelect('vip')}
                  className="w-full inline-flex justify-center items-center px-6 py-4 text-base font-medium rounded-full text-white bg-[#E91E63] hover:bg-[#E91E63]/90 transition-all duration-300 shadow-lg hover:shadow-[#E91E63]/20 hover:shadow-2xl transform hover:-translate-y-0.5"
                >
                  <span>Selecionar Plano</span>
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 