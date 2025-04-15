import React from 'react';

export default function About() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[40vh] flex items-center">
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
              Sobre
            </h2>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              Paula Azevedo
            </h1>
            <p className="text-xl text-white/90 mb-8 font-light">
              Conheça um pouco mais sobre mim e meu trabalho
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="w-full md:w-1/2">
                <img
                  src="https://res.cloudinary.com/dt9m3pkjv/image/upload/v1743376993/PAULA/geznhhqtqhe7fj0obmj3.png"
                  alt="Paula Azevedo"
                  className="rounded-2xl shadow-2xl"
                />
              </div>
              <div className="w-full md:w-1/2">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
                  <p className="text-lg mb-6">
                    Olá! Sou Paula Azevedo, criadora de conteúdo adulto artístico e sensual. 
                    Minha missão é proporcionar uma experiência única e elegante para meus assinantes.
                  </p>
                  <p className="text-lg mb-6">
                    Com mais de 5 anos de experiência na criação de conteúdo exclusivo, 
                    busco sempre inovar e trazer novidades para meus seguidores mais fiéis.
                  </p>
                  <p className="text-lg">
                    Todo o conteúdo é produzido com muito carinho e profissionalismo, 
                    garantindo a melhor qualidade para você.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}