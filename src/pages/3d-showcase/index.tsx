import React, { Suspense } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslations } from '@/contexts/TranslationContext';

// Import with no SSR to avoid hydration issues
const OfficeScene = dynamic(() => import('@/components/3d-showcase/OfficeScene'), { 
  ssr: false 
});

const ThreeDShowcase: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const t = useTranslations();

  // Translation texts
  const getTexts = () => {
    switch(language) {
      case 'pt-BR':
      case 'pt':
        return {
          exit: 'Sair da Experiência 3D',
          controls: 'Controles:',
          mouse: 'Mouse: Olhar ao redor',
          scroll: 'Scroll: Zoom in/out',
          click: 'Clique nos botões nas mesas',
          watch: 'Observe a bola quicar!',
          loading: 'Carregando Ambiente 3D...'
        };
      case 'es':
        return {
          exit: 'Salir de la Experiencia 3D',
          controls: 'Controles:',
          mouse: 'Ratón: Mirar alrededor',
          scroll: 'Scroll: Acercar/Alejar',
          click: 'Haz clic en los botones de los escritorios',
          watch: '¡Mira la pelota rebotar!',
          loading: 'Cargando Entorno 3D...'
        };
      case 'it':
        return {
          exit: 'Esci dall\'Esperienza 3D',
          controls: 'Controlli:',
          mouse: 'Mouse: Guarda intorno',
          scroll: 'Scroll: Zoom avanti/indietro',
          click: 'Clicca sui pulsanti sulle scrivanie',
          watch: 'Guarda la palla rimbalzare!',
          loading: 'Caricamento Ambiente 3D...'
        };
      default: // 'en'
        return {
          exit: 'Exit 3D Experience',
          controls: 'Controls:',
          mouse: 'Mouse: Look around',
          scroll: 'Scroll: Zoom in/out',
          click: 'Click buttons on desks',
          watch: 'Watch the ball bounce!',
          loading: 'Loading 3D Environment...'
        };
    }
  };

  const texts = getTexts();

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Language Selector */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50 flex gap-2">
        <button
          onClick={() => setLanguage('en')}
          className={`px-3 py-1 rounded ${language === 'en' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300'}`}
        >
          EN
        </button>
        <button
          onClick={() => setLanguage('pt-BR')}
          className={`px-3 py-1 rounded ${language === 'pt-BR' || language === 'pt' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300'}`}
        >
          PT
        </button>
        <button
          onClick={() => setLanguage('es')}
          className={`px-3 py-1 rounded ${language === 'es' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300'}`}
        >
          ES
        </button>
        <button
          onClick={() => setLanguage('it')}
          className={`px-3 py-1 rounded ${language === 'it' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300'}`}
        >
          IT
        </button>
      </div>

      {/* Exit Button */}
      <div className="absolute top-4 left-4 z-50">
        <Link href="/websites">
          <button className="relative bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-bold py-3 px-6 rounded-xl shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl flex items-center gap-3 border border-purple-500/30 overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-400/20 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 z-10"
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
            <span className="text-sm font-semibold tracking-wide z-10">{texts.exit}</span>
          </button>
        </Link>
      </div>

      {/* Instructions */}
      <div className="absolute top-4 right-4 z-50 bg-black/50 backdrop-blur-sm text-white p-4 rounded-lg max-w-xs">
        <h3 className="font-bold mb-2">{texts.controls}</h3>
        <ul className="text-sm space-y-1">
          <li>• {texts.mouse}</li>
          <li>• {texts.scroll}</li>
          <li>• {texts.click}</li>
        </ul>
        <div className="mt-3 pt-3 border-t border-white/20">
          <p className="text-xs text-yellow-400">{texts.watch}</p>
        </div>
      </div>

      {/* 3D Scene */}
      <Suspense fallback={
        <div className="flex items-center justify-center h-screen bg-black">
          <div className="text-white text-2xl">{texts.loading}</div>
        </div>
      }>
        <OfficeScene language={language} />
      </Suspense>
    </div>
  );
};

export default ThreeDShowcase;