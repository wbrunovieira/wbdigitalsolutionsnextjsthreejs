import React, { Suspense, useState, useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

// Import enhanced tunnel with no SSR to avoid hydration issues
const TunnelSceneEnhanced = dynamic(() => import('@/components/3d-tunnel/TunnelSceneEnhanced'), {
  ssr: false
});

const ThreeDTunnel: React.FC = () => {
  // Use local state for language since this page might not have LanguageContext
  const [language, setLanguage] = useState('en');
  const [useEnhanced, setUseEnhanced] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Language selector labels
  const getLanguageLabel = (lang: string) => {
    switch(lang) {
      case 'en': return '🇺🇸 EN';
      case 'pt-BR': return '🇧🇷 PT';
      case 'es': return '🇪🇸 ES';
      case 'it': return '🇮🇹 IT';
      default: return lang.toUpperCase();
    }
  };
  
  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Exit Button */}
      <div className={`absolute z-50 ${isMobile ? 'top-2 left-2' : 'top-4 left-4'}`}>
        <Link href="/websites">
          <button className={`relative bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-bold rounded-xl shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl flex items-center border border-purple-500/30 overflow-hidden group ${isMobile ? 'p-2' : 'py-3 px-6 gap-3'}`}>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-400/20 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`z-10 ${isMobile ? 'h-4 w-4' : 'h-5 w-5'}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            {!isMobile && <span className="text-sm font-semibold tracking-wide z-10">
              {language === 'pt-BR' || language === 'pt' ? 'Sair do Túnel' :
               language === 'es' ? 'Salir del Túnel' :
               language === 'it' ? 'Esci dal Tunnel' :
               'Exit Tunnel'}
            </span>}
          </button>
        </Link>
      </div>

      {/* Language Selector */}
      <div className={`absolute z-50 flex gap-2 ${isMobile ? 'top-2 right-2' : 'top-4 right-4'}`}>
        {['en', 'pt-BR', 'es', 'it'].map((lang) => (
          <button
            key={lang}
            onClick={() => setLanguage(lang)}
            className={`rounded-lg font-bold transition-all duration-300 ${
              isMobile ? 'px-2 py-1 text-xs' : 'px-3 py-2'
            } ${
              language === lang
                ? 'bg-purple-600 text-white'
                : 'bg-black/50 backdrop-blur-sm text-white/70 hover:bg-purple-800/50'
            }`}
          >
            {isMobile ? lang.split('-')[0].toUpperCase() : getLanguageLabel(lang)}
          </button>
        ))}
      </div>

      {/* Instructions - Desktop Only */}
      {!isMobile && (
        <div className="absolute bottom-4 right-4 z-50 bg-black/50 backdrop-blur-sm text-white p-4 rounded-lg max-w-sm">
          <h3 className="font-bold mb-2 text-purple-400">
            {language === 'pt-BR' || language === 'pt' ? 'Túnel Digital WB' :
             language === 'es' ? 'Túnel Digital WB' :
             language === 'it' ? 'Tunnel Digitale WB' :
             'WB Digital Tunnel'}
          </h3>
          <p className="text-sm">
            {language === 'pt-BR' || language === 'pt' ? 'Viaje através do espaço digital e conheça nossas soluções!' :
             language === 'es' ? '¡Viaja a través del espacio digital y conoce nuestras soluciones!' :
             language === 'it' ? 'Viaggia attraverso lo spazio digitale e conosci le nostre soluzioni!' :
             'Travel through digital space and discover our solutions!'}
          </p>
        </div>
      )}

      {/* Company Info Panel - Responsive */}
      <div className={`absolute z-50 bg-black/50 backdrop-blur-sm text-white rounded-lg ${
        isMobile
          ? 'bottom-16 left-1/2 transform -translate-x-1/2 p-3 max-w-xs'
          : 'bottom-4 left-4 p-4 max-w-sm'
      }`}>
        <h4 className={`font-bold mb-2 text-yellow-400 ${isMobile ? 'text-sm' : ''}`}>WB Digital Solutions</h4>
        <div className={`space-y-1 ${isMobile ? 'text-xs' : 'text-xs'}`}>
          <p className="flex items-center gap-2">
            <span className="text-purple-400">▸</span>
            {language === 'pt-BR' || language === 'pt' ? 'Tecnologia de Ponta' :
             language === 'es' ? 'Tecnología de Vanguardia' :
             language === 'it' ? 'Tecnologia all\'Avanguardia' :
             'Cutting-Edge Technology'}
          </p>
          <p className="flex items-center gap-2">
            <span className="text-yellow-400">▸</span>
            {language === 'pt-BR' || language === 'pt' ? 'Soluções Personalizadas' :
             language === 'es' ? 'Soluciones Personalizadas' :
             language === 'it' ? 'Soluzioni Personalizzate' :
             'Custom Solutions'}
          </p>
          <p className="flex items-center gap-2">
            <span className="text-blue-400">▸</span>
            {language === 'pt-BR' || language === 'pt' ? 'Inovação Constante' :
             language === 'es' ? 'Innovación Constante' :
             language === 'it' ? 'Innovazione Costante' :
             'Constant Innovation'}
          </p>
        </div>
      </div>

      {/* 3D Scene */}
      <Suspense fallback={
        <div className="flex items-center justify-center h-screen bg-black">
          <div className="text-white text-2xl">
            {language === 'pt-BR' || language === 'pt' ? 'Carregando Túnel...' : 
             language === 'es' ? 'Cargando Túnel...' :
             language === 'it' ? 'Caricamento Tunnel...' :
             'Loading Tunnel...'}
          </div>
        </div>
      }>
        <TunnelSceneEnhanced language={language} isMobile={isMobile} />
      </Suspense>
    </div>
  );
};

export default ThreeDTunnel;