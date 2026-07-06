'use client';

import { useTranslations } from '@/contexts/TranslationContext';

type Capability = { icon: string; title: string; desc: string };

const FALLBACK: Capability[] = [
  { icon: '🎓', title: 'Plataformas de Ensino (EAD)', desc: 'Cursos, vídeo-aulas, simulados, comunidade, sessões ao vivo e certificados.' },
  { icon: '🗂️', title: 'Sistemas de Gestão (ERP/CRM)', desc: 'Processos internos, automações, relatórios e controle sob medida.' },
  { icon: '☁️', title: 'Plataformas SaaS multiusuário', desc: 'Assinaturas, multi-tenant, billing e painéis administrativos.' },
  { icon: '🛒', title: 'Marketplaces & E-commerce', desc: 'Catálogos, pagamentos, logística e integrações de venda.' },
  { icon: '📊', title: 'Dashboards & BI', desc: 'Dados em tempo real, métricas e visualizações que orientam decisões.' },
  { icon: '🔌', title: 'APIs & Integrações', desc: 'Conectar sistemas, microsserviços e automação entre ferramentas.' },
];

const SystemsCapabilities: React.FC = () => {
  const t = useTranslations();
  const items: Capability[] = Array.isArray(t.systemsCapabilities) && t.systemsCapabilities.length
    ? t.systemsCapabilities
    : FALLBACK;

  return (
    <section className="bg-primary/80 backdrop-blur-sm relative px-6 py-16 lg:px-20 lg:py-24">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            {t.systemsWhatTitle ?? 'Qualquer sistema. Qualquer plataforma.'}
          </h2>
          <div className="mx-auto mt-3 h-1 w-40 bg-gradient-to-r from-yellowcustom to-transparent" />
          <p className="mx-auto mt-6 max-w-2xl text-secondary/90">
            {t.systemsWhatSubtitle ??
              'Não trabalhamos com templates. Cada sistema é arquitetado sob medida para o seu fluxo, seus dados e o seu crescimento.'}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((c, i) => (
            <div
              key={i}
              className="group rounded-2xl border border-custom-purple/30 bg-black/40 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-yellowcustom/50"
            >
              <div className="mb-4 text-4xl">{c.icon}</div>
              <h3 className="mb-2 text-lg font-semibold text-white">{c.title}</h3>
              <p className="text-sm leading-relaxed text-secondary/80">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SystemsCapabilities;
