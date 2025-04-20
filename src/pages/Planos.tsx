import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Lock, Send, MessageSquare, Mail, Zap, Crown, AlertCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function Plans() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

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
    } finally {
      setLoading(false);
    }
  }

  const handlePlanSelect = (plan: string) => {
    navigate(`/pagamento/${plan}`);
  };

  // Verificar se é página de confirmação
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
                        <Send size={20} />
                        <span>Receber via Telegram</span>
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
                        <MessageSquare size={20} />
                        <span>Receber via WhatsApp</span>
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
                        <Mail size={20} />
                        <span>Receber por E-mail</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="mt-8 pt-8 border-t border-[#E91E63]/10">
                  <h2 className="text-2xl font-bold text-white mb-4 text-center flex items-center justify-center gap-2">
                    <Lock size={24} className="text-[#E91E63]" />
                    <span>Pagar com Pix via Solalapay</span>
                  </h2>
                  <p className="text-white/60 text-center mb-6">
                    Clique abaixo para pagar com Pix de forma segura e automática.
                  </p>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[#E91E63] blur-[120px] opacity-5"></div>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Escolha seu Plano</h1>
            <p className="text-white/80 max-w-2xl mx-auto text-lg">
              Selecione o plano que melhor atende às suas necessidades e tenha acesso ao conteúdo exclusivo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto relative z-10">
            {/* Plano Básico */}
            <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-8 border border-[#E91E63]/20 hover:border-[#E91E63]/40 transition-all duration-300 shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-[#E91E63]/10 rounded-full flex items-center justify-center">
                  <Crown className="text-[#E91E63]" size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Plano Básico</h2>
                  <p className="text-[#E91E63]">R$29,90/mês</p>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-white/80">
                  <span className="text-[#E91E63]">✓</span>
                  <span>Acesso ao conteúdo básico</span>
                </div>
                <div className="flex items-center gap-3 text-white/80">
                  <span className="text-[#E91E63]">✓</span>
                  <span>Atualizações semanais</span>
                </div>
                <div className="flex items-center gap-3 text-white/80">
                  <span className="text-[#E91E63]">✓</span>
                  <span>Suporte por email</span>
                </div>
              </div>

              <button
                onClick={() => handlePlanSelect('basico')}
                className="w-full inline-flex justify-center items-center px-6 py-4 text-base font-medium rounded-full text-white bg-[#E91E63] hover:bg-[#E91E63]/90 transition-all duration-300 shadow-lg hover:shadow-[#E91E63]/20 hover:shadow-2xl transform hover:-translate-y-0.5"
              >
                Selecionar Plano Básico
              </button>
            </div>

            {/* Plano VIP */}
            <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-8 border-2 border-[#E91E63] hover:border-[#E91E63]/80 transition-all duration-300 shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-[#E91E63]/10 rounded-full flex items-center justify-center">
                  <Crown className="text-[#E91E63]" size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Plano VIP</h2>
                  <p className="text-[#E91E63]">R$59,90/mês</p>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-white/80">
                  <span className="text-[#E91E63]">✓</span>
                  <span>Acesso ao conteúdo VIP</span>
                </div>
                <div className="flex items-center gap-3 text-white/80">
                  <span className="text-[#E91E63]">✓</span>
                  <span>Atualizações diárias</span>
                </div>
                <div className="flex items-center gap-3 text-white/80">
                  <span className="text-[#E91E63]">✓</span>
                  <span>Suporte prioritário</span>
                </div>
                <div className="flex items-center gap-3 text-white/80">
                  <span className="text-[#E91E63]">✓</span>
                  <span>Conteúdo exclusivo</span>
                </div>
              </div>

              <button
                onClick={() => handlePlanSelect('vip')}
                className="w-full inline-flex justify-center items-center px-6 py-4 text-base font-medium rounded-full text-white bg-[#E91E63] hover:bg-[#E91E63]/90 transition-all duration-300 shadow-lg hover:shadow-[#E91E63]/20 hover:shadow-2xl transform hover:-translate-y-0.5"
              >
                Selecionar Plano VIP
              </button>
            </div>
          </div>

          <div className="mt-16 max-w-2xl mx-auto relative z-10">
            <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-8 border border-[#E91E63]/20">
              <h2 className="text-2xl font-bold text-white mb-4 text-center flex items-center justify-center gap-2">
                <Lock size={24} className="text-[#E91E63]" />
                <span>Pagar com Pix via Solalapay</span>
              </h2>
              <p className="text-white/60 text-center mb-6">
                Clique abaixo para pagar com Pix de forma segura e automática.
              </p>
              <a
                href="https://pagamento.solalapay.com/paula-vip"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex justify-center items-center px-6 py-4 text-base font-medium rounded-full text-white bg-[#E91E63] hover:bg-[#E91E63]/90 transition-all duration-300 shadow-lg hover:shadow-[#E91E63]/20 hover:shadow-2xl transform hover:-translate-y-0.5 gap-2"
              >
                <Zap size={20} />
                <span>Finalizar Pagamento</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 