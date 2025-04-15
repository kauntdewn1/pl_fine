import React from 'react';
import { Crown } from 'lucide-react';

export default function VIP() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Crown className="text-purple-400" size={32} />
          <h1 className="text-4xl font-bold">Área VIP</h1>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Content Grid */}
          {Array.from({ length: 6 }).map((_, index) => (
            <div 
              key={index}
              className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 hover:bg-white/10 transition-colors cursor-pointer"
            >
              <div className="aspect-video bg-purple-900/50 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-purple-300">Conteúdo Exclusivo {index + 1}</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Título do Conteúdo {index + 1}</h3>
              <p className="text-purple-200">
                Descrição breve do conteúdo exclusivo disponível para assinantes.
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}