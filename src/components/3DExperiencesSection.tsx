import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

const ThreeDExperiencesSection: React.FC = () => {
  const { language } = useLanguage();

  const getContent = () => {
    switch(language) {
      case 'pt-BR':
        return {
          title: 'Explore Nossas Experiências 3D',
          subtitle: 'Descubra o futuro da web com ambientes interativos e imersivos',
          office: {
            title: 'Escritório 3D',
            description: 'Navegue por um escritório virtual e conheça nossos serviços de forma interativa'
          },
          tunnel: {
            title: 'Túnel Digital',
            description: 'Viaje através do espaço digital e explore nossas soluções tecnológicas'
          },
          buttonOffice: 'Explorar Escritório',
          buttonTunnel: 'Entrar no Túnel'
        };
      case 'es':
        return {
          title: 'Explora Nuestras Experiencias 3D',
          subtitle: 'Descubre el futuro de la web con ambientes interactivos e inmersivos',
          office: {
            title: 'Oficina 3D',
            description: 'Navega por una oficina virtual y conoce nuestros servicios de forma interactiva'
          },
          tunnel: {
            title: 'Túnel Digital',
            description: 'Viaja a través del espacio digital y explora nuestras soluciones tecnológicas'
          },
          buttonOffice: 'Explorar Oficina',
          buttonTunnel: 'Entrar al Túnel'
        };
      case 'it':
        return {
          title: 'Esplora le Nostre Esperienze 3D',
          subtitle: 'Scopri il futuro del web con ambienti interattivi e immersivi',
          office: {
            title: 'Ufficio 3D',
            description: 'Naviga in un ufficio virtuale e conosci i nostri servizi in modo interattivo'
          },
          tunnel: {
            title: 'Tunnel Digitale',
            description: 'Viaggia attraverso lo spazio digitale ed esplora le nostre soluzioni tecnologiche'
          },
          buttonOffice: 'Esplora Ufficio',
          buttonTunnel: 'Entra nel Tunnel'
        };
      default:
        return {
          title: 'Explore Our 3D Experiences',
          subtitle: 'Discover the future of web with interactive and immersive environments',
          office: {
            title: '3D Office',
            description: 'Navigate through a virtual office and learn about our services interactively'
          },
          tunnel: {
            title: 'Digital Tunnel',
            description: 'Travel through digital space and explore our technological solutions'
          },
          buttonOffice: 'Explore Office',
          buttonTunnel: 'Enter Tunnel'
        };
    }
  };

  const content = getContent();

  return (
    <section className="py-20 mt-20 bg-gradient-to-b from-[#350545] via-[#350545]/80 to-[#350545]">
      <div className="container mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {content.title}
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            {content.subtitle}
          </p>
        </div>

        {/* Experience Cards */}
        <div className="grid md:grid-cols-2 gap-8 mt-12 max-w-6xl mx-auto">
          {/* 3D Office Card */}
          <div className="bg-black/50 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-8 hover:border-purple-400/50 transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl">🏢</span>
              <h3 className="text-2xl font-bold text-white">{content.office.title}</h3>
            </div>
            <p className="text-gray-300 mb-6">
              {content.office.description}
            </p>
            <Link href="/3d-showcase">
              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2">
                <span>🚀</span>
                <span>{content.buttonOffice}</span>
              </button>
            </Link>
          </div>

          {/* 3D Tunnel Card */}
          <div className="bg-black/50 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-8 hover:border-purple-400/50 transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl">🌌</span>
              <h3 className="text-2xl font-bold text-white">{content.tunnel.title}</h3>
            </div>
            <p className="text-gray-300 mb-6">
              {content.tunnel.description}
            </p>
            <Link href="/3d-tunnel">
              <button className="w-full bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2">
                <span>🌠</span>
                <span>{content.buttonTunnel}</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ThreeDExperiencesSection;