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
          <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition-all duration-300 hover:scale-105 flex items-center gap-2">
            <span>←</span>
            <span>{texts.exit}</span>
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