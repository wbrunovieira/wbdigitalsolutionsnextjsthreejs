import React, { Suspense, useEffect, useState } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { useLanguage } from '@/contexts/LanguageContext';
import { getShowcaseTexts } from '@/components/3d-showcase/data/showcaseTexts';
import ControlsHelp from '@/components/3d-showcase/hud/ControlsHelp';
import DeskShortcuts from '@/components/3d-showcase/hud/DeskShortcuts';
import ExitButton from '@/components/3d-showcase/hud/ExitButton';
import LanguageSwitch from '@/components/3d-showcase/hud/LanguageSwitch';

const OfficeScene = dynamic(() => import('@/components/3d-showcase/OfficeScene'), {
  ssr: false,
});

const MOBILE_BREAKPOINT = 768;

const ThreeDShowcase: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const texts = getShowcaseTexts(language);

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      <Head>
        <title>WB - 3D Office Showcase | WB Digital Solutions</title>
        <meta name="description" content="Interactive 3D office experience by WB Digital Solutions." />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href="https://www.wbdigitalsolutions.com/sala-3d" />
      </Head>

      <LanguageSwitch language={language} setLanguage={setLanguage} isMobile={isMobile} />
      <ExitButton label={texts.exit} isMobile={isMobile} />
      <ControlsHelp texts={texts} isMobile={isMobile} />
      {isMobile && <DeskShortcuts texts={texts} />}

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
