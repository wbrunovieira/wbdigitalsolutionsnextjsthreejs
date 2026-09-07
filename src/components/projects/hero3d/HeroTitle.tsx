import React from 'react';
import { HeroContent } from './heroContent';

/** Title band above the 3D stage: eyebrow between hairlines, headline and subtitle. */
const HeroTitle: React.FC<{ content: HeroContent }> = ({ content }) => (
  <div className="relative z-10 px-6 pt-32 pb-2 text-center md:pt-40">
    {/* Eyebrow between hairlines */}
    <div
      className="mb-6 flex animate-fade-in items-center justify-center gap-4"
      style={{ opacity: 0, animationDelay: '0s' }}
    >
      <span className="h-px w-8 bg-yellowcustom/40 md:w-12" aria-hidden="true" />
      <span className="font-mono text-[11px] uppercase tracking-[0.4em] text-yellowcustom md:text-xs">
        {content.eyebrow}
      </span>
      <span className="h-px w-8 bg-yellowcustom/40 md:w-12" aria-hidden="true" />
    </div>

    {/* Title — single colour, tight editorial scale */}
    <h1
      className="animate-fade-in text-5xl font-extrabold leading-[0.9] tracking-[-0.03em] text-white md:text-7xl lg:text-[5.25rem]"
      style={{ opacity: 0, animationDelay: '0.12s' }}
    >
      {content.lead} {content.accent}
    </h1>

    <p
      className="mx-auto mt-6 max-w-md animate-fade-in text-sm leading-relaxed text-secondary/80 md:max-w-xl md:text-base"
      style={{ opacity: 0, animationDelay: '0.24s' }}
    >
      {content.subtitle}
    </p>
  </div>
);

export default HeroTitle;
