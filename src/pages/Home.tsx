import React from 'react';
import { Link } from 'react-router-dom';
import { Crown, Lock } from 'lucide-react';

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0 z-0">
          <img
            src="https://res.cloudinary.com/dt9m3pkjv/image/upload/v1743376994/PAULA/s6otfqus8lez0uz1acmg.png"
            alt="Paula Azevedo"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-light mb-2 text-white/90">
              Paula Azevedo
            </h2>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              Conteúdo Adulto Exclusivo +18
            </h1>
            <p className="text-xl text-white/90 mb-8 font-light">
              Descubra meu universo íntimo com elegância, mistério e qualidade profissional.
            </p>
            <Link
              to="/planos"
              className="bg-accent hover:bg-accent-light px-8 py-3 rounded-full flex items-center gap-2 text-lg font-medium transition-colors w-fit text-white shadow-lg shadow-accent/20"
            >
              <Crown size={20} />
              <span>Quero meu acesso exclusivo</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Preview Cards */}
      <section className="py-20 bg-white/50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Preview dos Ensaios",
                image: "https://res.cloudinary.com/dt9m3pkjv/image/upload/v1743376995/PAULA/wa1d8vpmpj0n4hrqf7as.png"
              },
              {
                title: "Vídeos semanais",
                image: "https://res.cloudinary.com/dt9m3pkjv/image/upload/v1743376994/PAULA/tyqsrd7oytuxaalmddg5.png"
              },
              {
                title: "Mensagens exclusivas",
                image: "https://res.cloudinary.com/dt9m3pkjv/image/upload/v1743376993/PAULA/geznhhqtqhe7fj0obmj3.png"
              }
            ].map((item, index) => (
              <div key={index} className="relative group cursor-pointer">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover filter blur-sm group-hover:blur-0 transition-all duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center gap-4">
                    <Lock size={32} className="text-white" />
                    <h3 className="text-xl font-medium text-white text-center px-6">{item.title}</h3>
                    <p className="text-white/80 text-sm">Disponível para assinantes</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Escolha seu plano</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Basic Plan */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                  <Crown className="text-accent" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Plano Básico</h3>
                  <p className="text-accent">R$29,90/mês</p>
                </div>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <span className="text-accent">✓</span>
                  Assinatura mensal para acesso a conteúdo adulto artístico
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-accent">✓</span>
                  Acesso imediato às minhas fotos
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-accent">✓</span>
                  1 vez por semana faço novas :)
                </li>
              </ul>
              <Link
                to="/login"
                className="block text-center bg-accent hover:bg-accent-light text-white px-6 py-3 rounded-full transition-colors shadow-lg shadow-accent/20"
              >
                Assinar Básico
              </Link>
            </div>

            {/* VIP Plan */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border-2 border-accent">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                  <Crown className="text-accent" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Plano VIP</h3>
                  <p className="text-accent">R$59,90/mês</p>
                </div>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  Assinatura mensal para acesso a conteúdo adulto artístico
                </li>
                <li className="flex items-center gap-2">
                  Acesso imediato às minhas fotos e vídeos
                </li>
                <li className="flex items-center gap-2">
                  1 vez por semana farei com carinho mais fotos e vídeos :)
                </li>
              </ul>
              <Link
                to="/login"
                className="block text-center bg-accent hover:bg-accent-light text-white px-6 py-3 rounded-full transition-colors shadow-lg shadow-accent/20"
              >
                Assinar VIP
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center max-w-4xl mx-auto">
            <div className="w-full md:w-1/2">
              <img
                src="https://res.cloudinary.com/dt9m3pkjv/image/upload/v1743376993/PAULA/geznhhqtqhe7fj0obmj3.png"
                alt="Paula Azevedo"
                className="rounded-2xl shadow-2xl"
              />
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl font-bold mb-6">Sobre a Paula</h2>
              <p className="text-lg mb-4">
                "Sou Paula, uma mulher que ama provocar com arte, elegância e liberdade."
              </p>
              <p className="text-lg text-gray-600">
                "Meus conteúdos são feitos com carinho e sempre pensando no que te faz desejar mais."
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}