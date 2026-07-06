'use client';

import { useTranslations } from '@/contexts/TranslationContext';

type Step = { title: string; desc: string };

const FALLBACK: Step[] = [
  { title: 'Descoberta & Arquitetura', desc: 'Entendemos o negócio, modelamos os dados e desenhamos a arquitetura antes de escrever código.' },
  { title: 'Desenvolvimento Ágil', desc: 'Entregas incrementais, código testável e visibilidade do progresso a cada etapa.' },
  { title: 'Escala & Segurança', desc: 'Performance, infraestrutura e proteção de dados pensadas para crescer com você.' },
  { title: 'Evolução Contínua', desc: 'Monitoramento, suporte e melhorias contínuas depois do lançamento.' },
];

const SystemsProcess: React.FC = () => {
  const t = useTranslations();
  const steps: Step[] = Array.isArray(t.systemsProcessSteps) && t.systemsProcessSteps.length
    ? t.systemsProcessSteps
    : FALLBACK;

  return (
    <section className="bg-primary/80 backdrop-blur-sm relative px-6 py-16 lg:px-20 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            {t.systemsProcessTitle ?? 'Como construímos'}
          </h2>
          <div className="mx-auto mt-3 h-1 w-40 bg-gradient-to-r from-yellowcustom to-transparent" />
          <p className="mx-auto mt-6 max-w-2xl text-secondary/90">
            {t.systemsProcessSubtitle ??
              'Um processo claro, do primeiro diagnóstico à evolução contínua do sistema.'}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <div key={i} className="relative rounded-2xl border border-custom-purple/30 bg-black/40 p-6 backdrop-blur-sm">
              <span className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-yellowcustom to-custom-purple font-mono text-sm font-bold text-white">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mb-2 text-lg font-semibold text-white">{s.title}</h3>
              <p className="text-sm leading-relaxed text-secondary/80">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SystemsProcess;
