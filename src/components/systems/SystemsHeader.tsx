'use client';

import { useTranslations } from '@/contexts/TranslationContext';
import { FaArrowRight } from 'react-icons/fa';

const SystemsHeader: React.FC = () => {
  const t = useTranslations();

  return (
    <div className="relative z-10 max-w-2xl px-2 text-left">
      {/* Eyebrow */}
      <div className="mb-6 flex animate-fade-in items-center gap-4" style={{ opacity: 0, animationDelay: '0s' }}>
        <span className="h-px w-8 bg-yellowcustom/40 md:w-12" />
        <span className="font-mono text-[11px] uppercase tracking-[0.4em] text-yellowcustom md:text-xs">
          {t.systemsEyebrow ?? 'Plataformas e Sistemas'}
        </span>
      </div>

      <h1
        className="animate-fade-in text-4xl font-extrabold leading-[1.05] tracking-[-0.02em] text-white md:text-6xl"
        style={{ opacity: 0, animationDelay: '0.12s' }}
      >
        {t.systemsTitle1 ?? 'Construímos o sistema'}
        <span className="block bg-gradient-to-r from-yellowcustom to-custom-purple bg-clip-text text-transparent">
          {t.systemsTitle2 ?? 'que o seu negócio precisa'}
        </span>
      </h1>

      <p
        className="mt-6 max-w-xl animate-fade-in text-base leading-relaxed text-secondary/90 md:text-lg"
        style={{ opacity: 0, animationDelay: '0.24s' }}
      >
        {t.systemsSubtitle ??
          'De plataformas SaaS a sistemas internos sob medida — software robusto, escalável e seguro, na stack certa para o seu desafio.'}
      </p>

      <a
        href="https://wa.me/5511982864581"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 inline-flex animate-fade-in items-center gap-3 rounded-full bg-gradient-to-r from-yellowcustom to-custom-purple px-8 py-4 font-semibold text-white shadow-lg shadow-custom-purple/30 transition-transform duration-300 hover:scale-105"
        style={{ opacity: 0, animationDelay: '0.36s' }}
      >
        {t.systemsCtaButton ?? 'Vamos conversar'}
        <FaArrowRight className="h-4 w-4" />
      </a>
    </div>
  );
};

export default SystemsHeader;
