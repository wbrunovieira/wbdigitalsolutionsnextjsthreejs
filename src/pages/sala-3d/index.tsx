import React, { Suspense, useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useLanguage } from '@/contexts/LanguageContext';

// Import with no SSR to avoid hydration issues
const OfficeScene = dynamic(() => import('@/components/3d-showcase/OfficeScene'), { 
  ssr: false, 
});

const ThreeDShowcase: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const [isMobile, setIsMobile] = useState(false);
  const [showControls, setShowControls] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
          loading: 'Carregando Ambiente 3D...',
          touchDrag: 'Toque e arraste para girar',
          pinchZoom: 'Pinça para zoom',
          navWebsites: 'Sites',
          navAutomation: 'Automação',
          navAi: 'I.A.',
        };
      case 'es':
        return {
          exit: 'Salir de la Experiencia 3D',
          controls: 'Controles:',
          mouse: 'Ratón: Mirar alrededor',
          scroll: 'Scroll: Acercar/Alejar',
          click: 'Haz clic en los botones de los escritorios',
          watch: '¡Mira la pelota rebotar!',
          loading: 'Cargando Entorno 3D...',
          touchDrag: 'Toca y arrastra para girar',
          pinchZoom: 'Pellizca para zoom',
          navWebsites: 'Sitios',
          navAutomation: 'Automatización',
          navAi: 'I.A.',
        };
      case 'it':
        return {
          exit: 'Esci dall\'Esperienza 3D',
          controls: 'Controlli:',
          mouse: 'Mouse: Guarda intorno',
          scroll: 'Scroll: Zoom avanti/indietro',
          click: 'Clicca sui pulsanti sulle scrivanie',
          watch: 'Guarda la palla rimbalzare!',
          loading: 'Caricamento Ambiente 3D...',
          touchDrag: 'Tocca e trascina per ruotare',
          pinchZoom: 'Pizzica per lo zoom',
          navWebsites: 'Siti',
          navAutomation: 'Automazione',
          navAi: 'I.A.',
        };
      default: // 'en'
        return {
          exit: 'Exit 3D Experience',
          controls: 'Controls:',
          mouse: 'Mouse: Look around',
          scroll: 'Scroll: Zoom in/out',
          click: 'Click buttons on desks',
          watch: 'Watch the ball bounce!',
          loading: 'Loading 3D Environment...',
          touchDrag: 'Touch and drag to rotate',
          pinchZoom: 'Pinch to zoom',
          navWebsites: 'Websites',
          navAutomation: 'Automation',
          navAi: 'A.I.',
        };
    }
  };

  const texts = getTexts();

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      <Head>
        <title>WB - 3D Office Showcase | WB Digital Solutions</title>
        <meta name="description" content="Interactive 3D office experience by WB Digital Solutions." />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href="https://www.wbdigitalsolutions.com/sala-3d" />
      </Head>
      {/* Language Selector */}
      <div className={`absolute z-50 flex gap-1 ${isMobile ? 'top-2 right-2' : 'top-4 left-1/2 transform -translate-x-1/2'}`}>
        <button
          onClick={() => setLanguage('en')}
          className={`${isMobile ? 'px-2 py-1 text-xs' : 'px-3 py-1'} rounded ${language === 'en' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300'}`}
        >
          EN
        </button>
        <button
          onClick={() => setLanguage('pt-BR')}
          className={`${isMobile ? 'px-2 py-1 text-xs' : 'px-3 py-1'} rounded ${language === 'pt-BR' || language === 'pt' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300'}`}
        >
          PT
        </button>
        <button
          onClick={() => setLanguage('es')}
          className={`${isMobile ? 'px-2 py-1 text-xs' : 'px-3 py-1'} rounded ${language === 'es' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300'}`}
        >
          ES
        </button>
        <button
          onClick={() => setLanguage('it')}
          className={`${isMobile ? 'px-2 py-1 text-xs' : 'px-3 py-1'} rounded ${language === 'it' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300'}`}
        >
          IT
        </button>
      </div>

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
            {!isMobile && <span className="text-sm font-semibold tracking-wide z-10">{texts.exit}</span>}
          </button>
        </Link>
      </div>

      {/* Instructions - Desktop Only or Mobile Toggle */}
      {isMobile ? (
        <>
          {/* Mobile Help Button */}
          <button
            onClick={() => setShowControls(!showControls)}
            className="absolute bottom-4 right-4 z-50 bg-purple-600/80 text-white p-3 rounded-full shadow-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>

          {/* Mobile Controls Overlay */}
          {showControls && (
            <div className="absolute inset-0 z-40 bg-black/70 flex items-center justify-center p-4" onClick={() => setShowControls(false)}>
              <div className="bg-black/90 text-white p-6 rounded-xl max-w-sm w-full" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-lg">{texts.controls}</h3>
                  <button onClick={() => setShowControls(false)} className="text-gray-400">
                    ✕
                  </button>
                </div>
                <ul className="text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400">👆</span>
                    <span>{texts.touchDrag}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400">🤏</span>
                    <span>{texts.pinchZoom}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400">👈</span>
                    <span>{texts.click}</span>
                  </li>
                </ul>
                <div className="mt-4 pt-4 border-t border-white/20">
                  <p className="text-xs text-yellow-400">{texts.watch}</p>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
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
      )}

      {/* Mobile Quick Navigation Buttons */}
      {isMobile && (
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-50 flex gap-3">
          <button
            onClick={() => {
              const event = new CustomEvent('navigateToDesk', { detail: 'websites' });
              window.dispatchEvent(event);
            }}
            className="bg-gradient-to-b from-purple-600 to-purple-700 text-white px-5 py-3 rounded-xl text-sm font-bold shadow-xl border border-purple-400/30 active:scale-95 transition-transform"
          >
            {texts.navWebsites}
          </button>
          <button
            onClick={() => {
              const event = new CustomEvent('navigateToDesk', { detail: 'automation' });
              window.dispatchEvent(event);
            }}
            className="bg-gradient-to-b from-yellow-500 to-yellow-600 text-white px-5 py-3 rounded-xl text-sm font-bold shadow-xl border border-yellow-400/30 active:scale-95 transition-transform"
          >
            {texts.navAutomation}
          </button>
          <button
            onClick={() => {
              const event = new CustomEvent('navigateToDesk', { detail: 'ai' });
              window.dispatchEvent(event);
            }}
            className="bg-gradient-to-b from-blue-500 to-blue-600 text-white px-5 py-3 rounded-xl text-sm font-bold shadow-xl border border-blue-400/30 active:scale-95 transition-transform"
          >
            {texts.navAi}
          </button>
        </div>
      )}

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