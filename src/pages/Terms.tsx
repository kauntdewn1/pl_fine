import React from 'react';
import { FileText } from 'lucide-react';

export default function Terms() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <FileText className="text-purple-400" size={32} />
          <h1 className="text-4xl font-bold">Termos de Uso</h1>
        </div>

        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8">
          <p className="text-lg text-purple-200 mb-6">
            Acesse nossos termos de uso completos no documento abaixo:
          </p>
          
          <a 
            href="/terms.pdf" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-full transition-colors"
          >
            <FileText size={20} />
            <span>Baixar PDF dos Termos de Uso</span>
          </a>
        </div>
      </div>
    </div>
  );
}