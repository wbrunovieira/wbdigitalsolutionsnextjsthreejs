import React, { Suspense, useState } from 'react';
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
      <div className="absolute top-4 left-4 z-50">
        <Link href="/websites">
          <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition-all duration-300 hover:scale-105 flex items-center gap-2">
            <span>←</span>
            <span>Exit Tunnel</span>
          </button>
        </Link>
      </div>

      {/* Language Selector */}
      <div className="absolute top-4 right-4 z-50 flex gap-2">
        {['en', 'pt-BR', 'es', 'it'].map((lang) => (
          <button
            key={lang}
            onClick={() => setLanguage(lang)}
            className={`px-3 py-2 rounded-lg font-bold transition-all duration-300 ${
              language === lang 
                ? 'bg-purple-600 text-white scale-110' 
                : 'bg-black/50 backdrop-blur-sm text-white/70 hover:bg-purple-800/50'
            }`}
          >
            {getLanguageLabel(lang)}
          </button>
        ))}
      </div>

      {/* Instructions */}
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

      {/* Company Info Panel */}
      <div className="absolute bottom-4 left-4 z-50 bg-black/50 backdrop-blur-sm text-white p-4 rounded-lg max-w-sm">
        <h4 className="font-bold mb-2 text-yellow-400">WB Digital Solutions</h4>
        <div className="text-xs space-y-1">
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
        <TunnelSceneEnhanced language={language} />
      </Suspense>
    </div>
  );
};

export default ThreeDTunnel;