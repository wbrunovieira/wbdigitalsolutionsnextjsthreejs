import React from 'react';

interface Stat { label: string; value: string }

/**
 * The number band, deliberately placed after problem, features and result: a
 * buyer decides on those, and only then wants a couple of figures. Labels are
 * written as plain phrases ("screens in the system"), never as internal
 * engineering units such as data models or test files.
 */
const DetailStats: React.FC<{ title: string; stats: Stat[] }> = ({ title, stats }) => (
  <section className="border-y border-custom-purple/20 bg-gradient-to-r from-primary via-custom-purple/15 to-primary px-6 py-14">
    <div className="container mx-auto max-w-5xl">
      <h2 className="mb-10 text-center font-mono text-xs tracking-[0.3em] text-yellowcustom">{title}</h2>
      <div
        className={`grid grid-cols-2 gap-6 ${
          stats.length === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'
        }`}
      >
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <p className="text-3xl font-extrabold text-yellowcustom lg:text-4xl">{s.value}</p>
            <p className="mt-1 text-xs leading-snug text-secondary lg:text-sm">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default DetailStats;
