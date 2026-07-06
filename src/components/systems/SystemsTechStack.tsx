'use client';

import dynamic from 'next/dynamic';
import { Tooltip } from 'react-tooltip';
import { technologies } from '../../constants';
import { useTranslations } from '@/contexts/TranslationContext';

const BallCanvas = dynamic(() => import('../canvas/Ball'), {
  ssr: false,
  loading: () => <div className="h-full w-full" />,
});

const SystemsTechStack: React.FC = () => {
  const t = useTranslations();

  return (
    <section className="bg-custom-purple/30 backdrop-blur-sm relative px-6 py-16 lg:px-20 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            {t.systemsTechTitle ?? 'A stack certa para cada desafio'}
          </h2>
          <div className="mx-auto mt-3 h-1 w-40 bg-gradient-to-r from-yellowcustom to-transparent" />
          <p className="mx-auto mt-6 max-w-2xl text-secondary/90">
            {t.systemsTechSubtitle ??
              'Escolhemos a tecnologia pela necessidade do projeto — performance, escala e segurança em primeiro lugar.'}
          </p>
        </div>

        <div className="flex flex-row flex-wrap justify-center gap-8 md:gap-10">
          {technologies.map((technology: { name: string; icon: string }) => (
            <div
              className="h-20 w-20 md:h-28 md:w-28"
              key={technology.name}
              data-tooltip-id="systems-tech-tooltip"
              data-tooltip-content={technology.name}
            >
              <BallCanvas icon={technology.icon} />
            </div>
          ))}
          <Tooltip id="systems-tech-tooltip" />
        </div>
      </div>
    </section>
  );
};

export default SystemsTechStack;
