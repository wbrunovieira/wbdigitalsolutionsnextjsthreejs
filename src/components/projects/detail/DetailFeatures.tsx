import React from 'react';

interface Feature { icon: string; title: string; description: string }

const DetailFeatures: React.FC<{ title: string; features: Feature[] }> = ({ title, features }) => (
  <section className="px-6 pt-20">
    <div className="container mx-auto max-w-5xl">
      <h2 className="mb-10 text-2xl font-bold md:text-3xl">{title}</h2>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f) => (
          <div
            key={f.title}
            className="rounded-2xl border border-custom-purple/25 bg-primary/40 p-5 transition-colors hover:border-custom-purple/60"
          >
            <div className="text-2xl" aria-hidden>{f.icon}</div>
            <h3 className="mt-3 font-bold text-white">{f.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-secondary">{f.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default DetailFeatures;
