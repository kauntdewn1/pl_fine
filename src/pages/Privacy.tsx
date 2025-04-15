import React from 'react';
import { Shield } from 'lucide-react';

export default function Privacy() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Shield className="text-purple-400" size={32} />
          <h1 className="text-4xl font-bold">Política de Privacidade</h1>
        </div>

        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8">
          <p className="text-lg text-purple-200 mb-6">
            Acesse nossa política de privacidade completa no documento abaixo:
          </p>
          
          <a 
            href="/privacy.pdf" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-full transition-colors"
          >
            <Shield size={20} />
            <span>Baixar PDF da Política de Privacidade</span>
          </a>
        </div>
      </div>
    </div>
  );
}