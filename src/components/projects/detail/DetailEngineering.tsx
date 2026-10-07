import React from 'react';
import BulletList from './BulletList';

/**
 * Last block on the page: engineering depth. It stays on the page for technical
 * visitors but is demoted below problem, features and result, and it carries a
 * note saying who it is for so a non-technical reader knows they can stop here.
 */
const DetailEngineering: React.FC<{ title: string; note: string; items: string[] }> = ({
  title,
  note,
  items,
}) => (
  <section className="px-6 py-20">
    <div className="container mx-auto max-w-4xl rounded-3xl border border-custom-purple/25 bg-primary/40 p-8 md:p-12">
      <h2 className="text-xl font-bold md:text-2xl">{title}</h2>
      <p className="mt-3 font-mono text-xs leading-relaxed text-secondary/80 md:text-sm">{note}</p>
      <BulletList
        items={items}
        className="mt-8 space-y-4"
        itemClassName="text-sm text-secondary md:text-base"
      />
    </div>
  </section>
);

export default DetailEngineering;
