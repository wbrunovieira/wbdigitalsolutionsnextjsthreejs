'use client';

import { useTranslations } from '@/contexts/TranslationContext';
import { FaArrowRight } from 'react-icons/fa';

const SystemsCTA: React.FC = () => {
  const t = useTranslations();

  return (
    <section className="relative mx-4 mb-20 rounded-2xl bg-gradient-to-br from-[#350545]/85 via-[#792990]/85 to-[#350545]/85 backdrop-blur-sm px-8 py-20 lg:px-12">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold text-white md:text-4xl">
          {t.systemsCtaTitle ?? 'Tem um sistema em mente?'}
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-secondary/90">
          {t.systemsCtaDesc ??
            'Conte o desafio. Desenhamos a solução técnica ideal e o caminho para tirá-la do papel.'}
        </p>
        <a
          href="https://wa.me/5511982864581"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-yellowcustom to-custom-purple px-8 py-4 font-semibold text-white shadow-lg shadow-custom-purple/30 transition-transform duration-300 hover:scale-105"
        >
          {t.systemsCtaAction ?? 'Iniciar projeto'}
          <FaArrowRight className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
};

export default SystemsCTA;
