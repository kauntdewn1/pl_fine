import React from 'react';
import { Shield, ExternalLink } from 'lucide-react';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-black/40 backdrop-blur-lg p-8 rounded-2xl border border-[#E91E63]/20 shadow-lg shadow-[#E91E63]/10">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#E91E63]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="text-[#E91E63]" size={32} />
          </div>
          <h1 className="text-3xl font-bold text-[#E91E63] mb-2">Política de Privacidade</h1>
          <p className="text-white/80">
            Sua privacidade é importante para nós. Saiba como protegemos seus dados.
          </p>
        </div>

        <div className="space-y-6 text-white/80">
          <p>Acesse nossa política de privacidade completa no link abaixo:</p>

          <div className="flex justify-center">
            <a
              href="https://paulaazevedo.site/privacidade"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#E91E63] hover:bg-[#E91E63]/90 text-white px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-[#E91E63]/20 hover:shadow-2xl transform hover:-translate-y-0.5"
            >
              <ExternalLink size={20} />
              <span>Ver Política de Privacidade</span>
            </a>
          </div>

          <div className="mt-8 pt-8 border-t border-[#E91E63]/10">
            <p className="text-sm text-center">
              Em caso de dúvidas, entre em contato através do email:{' '}
              <a
                href="mailto:contato@paulaazevedo.com"
                className="text-[#E91E63] hover:text-[#E91E63]/90 transition-colors"
              >
                contato@paulaazevedo.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
