import { Crown, Lock } from 'lucide-react';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://res.cloudinary.com/dt9m3pkjv/image/upload/v1743376994/PAULA/s6otfqus8lez0uz1acmg.png"
            alt="Paula Azevedo"
            className="w-full h-full object-cover object-center"
            fallbackSrc="/hero-fallback.jpg"
          />
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              Conteúdo Exclusivo
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Acesso a fotos e vídeos exclusivos
            </p>
            <Link
              to="/planos"
              className="inline-flex items-center justify-center gap-2 bg-[#E91E63] hover:bg-[#E91E63]/90 text-white px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-[#E91E63]/20 hover:shadow-2xl transform hover:-translate-y-0.5 text-lg font-medium"
            >
              Ver Planos
            </Link>
          </div>
        </div>
      </section>

      {/* Preview Cards */}
      <section className="py-20 bg-black/50 backdrop-blur-lg">
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
                <div className="aspect-[3/4] rounded-2xl overflow-hidden border border-[#E91E63]/20 shadow-lg shadow-[#E91E63]/10">
                  <ImageWithFallback 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover filter blur-sm group-hover:blur-0 transition-all duration-300"
                    fallbackSrc="/preview-fallback.jpg"
                  />
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center gap-4">
                    <Lock size={32} className="text-[#E91E63]" />
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
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Basic Plan */}
            <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-[#E91E63]/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-[#E91E63]/10 rounded-full flex items-center justify-center">
                  <Crown className="text-[#E91E63]" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Plano Básico</h3>
                  <p className="text-[#E91E63]">R$29,90/mês</p>
                </div>
              </div>
              <ul className="space-y-3 mb-8 text-white/80">
                <li className="flex items-center gap-2">
                  <span className="text-[#E91E63]">✓</span>
                  Assinatura mensal para acesso a conteúdo adulto artístico
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#E91E63]">✓</span>
                  Acesso imediato às minhas fotos
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#E91E63]">✓</span>
                  1 vez por semana faço novas :)
                </li>
              </ul>
              <a
                href="https://paulaazevedo.gumroad.com/l/basiquinha"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex justify-center items-center px-6 py-4 text-base font-medium rounded-full text-white bg-[#E91E63] hover:bg-[#E91E63]/90 transition-all duration-300 shadow-lg hover:shadow-[#E91E63]/20 hover:shadow-2xl transform hover:-translate-y-0.5"
              >
                Assinar Plano Básico
              </a>
            </div>

            {/* VIP Plan */}
            <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-8 shadow-xl border-2 border-[#E91E63]">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-[#E91E63]/10 rounded-full flex items-center justify-center">
                  <Crown className="text-[#E91E63]" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Plano VIP</h3>
                  <p className="text-[#E91E63]">R$59,90/mês</p>
                </div>
              </div>
              <ul className="space-y-3 mb-8 text-white/80">
                <li className="flex items-center gap-2">
                  <span className="text-[#E91E63]">✓</span>
                  Assinatura mensal para acesso a conteúdo adulto artístico
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#E91E63]">✓</span>
                  Acesso imediato às minhas fotos e vídeos
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#E91E63]">✓</span>
                  1 vez por semana farei com carinho mais fotos e vídeos :)
                </li>
              </ul>
              <a
                href="https://paulaazevedo.gumroad.com/l/vip"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex justify-center items-center px-6 py-4 text-base font-medium rounded-full text-white bg-[#E91E63] hover:bg-[#E91E63]/90 transition-all duration-300 shadow-lg hover:shadow-[#E91E63]/20 hover:shadow-2xl transform hover:-translate-y-0.5"
              >
                Assinar Plano VIP
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-black/40 backdrop-blur-lg">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center max-w-4xl mx-auto">
            <div className="w-full md:w-1/2">
              <ImageWithFallback
                src="https://res.cloudinary.com/dt9m3pkjv/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1743376996/PAULA/fshl7aofaf0kulzpjxvk.png"
                alt="Paula Azevedo"
                className="rounded-2xl shadow-2xl border border-[#E91E63]/20"
                fallbackSrc="/about-fallback.jpg"
              />
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="text-4xl font-bold text-[#E91E63] mb-6">Sobre a Paula</h2>
              <p className="text-lg mb-4 text-white">"Sou Paula, uma mulher que ama provocar com arte, elegância e liberdade."</p>
              <p className="text-lg text-white/80">"Meus conteúdos são feitos com carinho e sempre pensando no que te faz desejar mais."</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
