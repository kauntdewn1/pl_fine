import { useState } from 'react';
import { Send, MessageCircle, Mail } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChannelSelection = async (channel: 'telegram' | 'whatsapp' | 'email') => {
    setIsLoading(true);
    setError(null);

    // Get email and plan from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get('email');
    const plano = urlParams.get('plano');

    if (!email) {
      setError('Email não encontrado nos parâmetros da URL');
      setIsLoading(false);
      return;
    }

    try {
      // Register the channel preference in Supabase
      const { error: supabaseError } = await supabase.from('clientes_vip').insert([
        {
          email,
          canal_entrega: channel,
          status: 'pago',
          plano: plano || 'vip', // Default to 'vip' if not specified
        },
      ]);

      if (supabaseError) throw supabaseError;

      // Redirect based on channel selection
      const redirectUrls = {
        telegram: 'https://t.me/PaulaAzevedo_Bot?start=vip',
        whatsapp: 'https://wa.me/+553131931679?text=Quero+acesso+VIP+confirmado',
        email: 'mailto:azevedomendespaula@gmail.com?subject=Acesso%20VIP&body=Confirmado',
      };

      window.location.href = redirectUrls[channel];
    } catch (err) {
      console.error('Error registering channel preference:', err);
      setError('Erro ao registrar sua preferência. Por favor, tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto bg-[#dad4cd] backdrop-blur-sm rounded-3xl p-8 shadow-xl">
        <div className="text-center">
          <div className="text-5xl mb-4">💖</div>
          <h1 className="text-3xl font-bold mb-2 text-[#ff007a]">Acesso Confirmado!</h1>
          <p className="text-lg mb-8 text-gray-600">Como você prefere receber seu conteúdo VIP?</p>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <div className="space-y-4">
            {/* Botão Telegram */}
            <button
              onClick={() => handleChannelSelection('telegram')}
              disabled={isLoading}
              className="flex items-center justify-center gap-2 w-full bg-[#ff007a] hover:bg-[#ff1a88] text-white px-6 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={20} />
              <span className="font-medium">
                {isLoading ? 'Processando...' : 'Entrar pelo Telegram'}
              </span>
            </button>

            {/* Botão WhatsApp */}
            <button
              onClick={() => handleChannelSelection('whatsapp')}
              disabled={isLoading}
              className="flex items-center justify-center gap-2 w-full bg-[#ff007a] hover:bg-[#ff1a88] text-white px-6 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <MessageCircle size={20} />
              <span className="font-medium">
                {isLoading ? 'Processando...' : 'Receber via WhatsApp'}
              </span>
            </button>

            {/* Botão E-mail */}
            <button
              onClick={() => handleChannelSelection('email')}
              disabled={isLoading}
              className="flex items-center justify-center gap-2 w-full bg-[#ff007a] hover:bg-[#ff1a88] text-white px-6 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Mail size={20} />
              <span className="font-medium">
                {isLoading ? 'Processando...' : 'Receber por E-mail'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
