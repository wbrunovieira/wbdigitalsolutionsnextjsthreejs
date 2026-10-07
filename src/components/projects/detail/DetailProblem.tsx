import React from 'react';

/**
 * First block after the hero: what problem the project solved, in plain words.
 * Rendered as prose (not bullets) because the problem is a short story, and a
 * business owner should recognise their own situation in it before reading on.
 */
const DetailProblem: React.FC<{ title: string; paragraphs: string[] }> = ({ title, paragraphs }) => (
  <section className="px-6 pt-20">
    <div className="container mx-auto max-w-3xl">
      <h2 className="text-2xl font-bold md:text-3xl">{title}</h2>
      <div className="mt-6 border-l-2 border-yellowcustom/50 pl-5 md:pl-6">
        {paragraphs.map((paragraph) => (
          <p key={paragraph} className="mt-4 text-base leading-relaxed text-secondary first:mt-0 md:text-lg">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  </section>
);

export default DetailProblem;
