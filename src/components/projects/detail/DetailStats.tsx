import React from 'react';

interface Stat { label: string; value: string }

const DetailStats: React.FC<{ stats: Stat[] }> = ({ stats }) => (
  <section className="border-y border-custom-purple/20 bg-gradient-to-r from-primary via-custom-purple/15 to-primary px-6 py-14">
    <div className="container mx-auto max-w-5xl">
      <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <p className="text-3xl font-extrabold text-yellowcustom lg:text-4xl">{s.value}</p>
            <p className="mt-1 text-xs text-secondary lg:text-sm">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default DetailStats;
