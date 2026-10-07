import React from 'react';

/**
 * Third buyer-facing block: did it turn out well. Each line is one outcome, and
 * the last lines are deliberately the honest limits, so the page never reads as
 * a claim the code cannot back.
 */
const DetailResult: React.FC<{ title: string; items: string[] }> = ({ title, items }) => (
  <section className="px-6 pb-20">
    <div className="container mx-auto max-w-4xl rounded-3xl border border-yellowcustom/25 bg-yellowcustom/[0.04] p-8 md:p-12">
      <h2 className="text-2xl font-bold md:text-3xl">{title}</h2>
      <ul className="mt-8 space-y-4">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-secondary md:text-base">
            <span className="mt-0.5 text-yellowcustom" aria-hidden>
              ✓
            </span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default DetailResult;
