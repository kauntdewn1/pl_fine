import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import QRCode from 'qrcode';
import { Copy, Wallet } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function PagamentoSolana() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const plano = searchParams.get('plano') || 'vip';
  const valorUSDC = plano === 'vip' ? '11.90' : '5.90';
  const [copySuccess, setCopySuccess] = useState(false);

  const solanaPayURL = `solana:Bck8y3gCzCRnbzm1wAGJpoYxKxiuCWf8v4jnki6SRXEe?amount=${valorUSDC}&label=Paula%20Azevedo&message=Conteúdo%20${plano}&memo=${plano}`;

  useEffect(() => {
    const generateQRCode = async () => {
      try {
        const url = await QRCode.toDataURL(solanaPayURL);
        setQrCodeUrl(url);
      } catch (err) {
        console.error('Error generating QR code:', err);
      }
    };

    generateQRCode();
  }, [solanaPayURL]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(solanaPayURL);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleCanalSelection = async (canal: 'telegram' | 'whatsapp' | 'email') => {
    if (!email) {
      setError('Por favor, insira seu e-mail para continuar.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const { error: supabaseError } = await supabase
        .from('clientes_vip')
        .insert([
          {
            email,
            canal_entrega: canal,
            status: 'pago',
            plano
          }
        ]);

      if (supabaseError) throw supabaseError;

      // Redirect based on channel selection
      const redirectUrls = {
        telegram: 'https://t.me/PaulaAzevedo_Bot?start=vip',
        whatsapp: 'https://wa.me/+553131931679?text=Quero+acesso+VIP+confirmado',
        email: 'mailto:azevedomendespaula@gmail.com?subject=Acesso%20VIP&body=Confirmado'
      };

      window.location.href = redirectUrls[canal];
    } catch (err) {
      console.error('Error registering channel preference:', err);
      setError('Erro ao registrar sua preferência. Por favor, tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
        <div className="text-center">
          <div className="text-5xl mb-6">💖</div>
          <h1 className="text-2xl font-bold mb-2 text-accent">Pagamento com Solana Pay</h1>
          <p className="text-gray-600 mb-6">
            Envie exatamente <span className="font-bold">{valorUSDC} USDC</span> para desbloquear seu acesso VIP
          </p>

          {qrCodeUrl && (
            <div className="bg-white p-4 rounded-xl shadow-inner mb-6">
              <img 
                src={qrCodeUrl} 
                alt="QR Code Solana Pay" 
                className="mx-auto w-48 h-48"
              />
            </div>
          )}

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600 mb-2">Código de pagamento:</p>
            <div className="flex items-center justify-between bg-white rounded-lg p-3 border border-gray-200">
              <code className="text-xs text-gray-700 break-all">{solanaPayURL}</code>
              <button
                onClick={handleCopyLink}
                className="ml-2 p-2 hover:bg-gray-100 rounded-full transition-colors"
                title="Copiar código"
              >
                <Copy size={16} className={copySuccess ? 'text-green-500' : 'text-gray-500'} />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Use uma wallet compatível com Solana Pay (como Phantom) para escanear o QR Code ou copie o código acima e cole no app.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-accent">Como você prefere receber seu conteúdo VIP?</h2>
            
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
                {error}
              </div>
            )}

            <div className="mb-4">
              <input
                type="email"
                placeholder="Digite seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-accent focus:border-transparent"
              />
            </div>

            <div className="space-y-3">
              <button
                onClick={() => handleCanalSelection('telegram')}
                disabled={isLoading}
                className="w-full bg-accent hover:bg-accent-light text-white px-6 py-3 rounded-full transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                🔓 Entrar pelo Telegram
              </button>

              <button
                onClick={() => handleCanalSelection('whatsapp')}
                disabled={isLoading}
                className="w-full bg-accent hover:bg-accent-light text-white px-6 py-3 rounded-full transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                💬 Receber via WhatsApp
              </button>

              <button
                onClick={() => handleCanalSelection('email')}
                disabled={isLoading}
                className="w-full bg-accent hover:bg-accent-light text-white px-6 py-3 rounded-full transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                📩 Receber por E-mail
              </button>
            </div>
          </div>

          <hr className="my-8 border-gray-200" />

          <div>
            <h2 className="text-xl font-bold mb-4 text-accent">Pagamento com Pix via Solalapay</h2>
            <p className="text-gray-600 mb-4">
              Se preferir, clique abaixo para pagar com Pix de forma segura e automática.
            </p>
            <a
              href="https://pagamento.solalapay.com/paula-vip"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-accent hover:bg-accent-light text-white px-6 py-4 rounded-full transition-colors text-center"
            >
              💳 Pagar com Pix
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}