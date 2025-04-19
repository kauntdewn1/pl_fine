import React from 'react';
import { FileText } from 'lucide-react';

export default function Terms() {
  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <FileText className="text-accent" size={32} />
          <h1 className="text-4xl font-bold text-text">Termos de Uso</h1>
        </div>

        <div className="bg-card rounded-lg shadow-lg p-8">
          <p className="text-lg text-text/80 mb-6">
            Acesse nossos termos de uso completos no link abaixo:
          </p>
          
          <a 
            href="https://paulaazevedo.site/termos" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-md transition-colors"
          >
            <FileText size={20} />
            <span>Ver Termos de Uso</span>
          </a>
        </div>
      </div>
    </div>
  );
}