'use client';

/**
 * Visual header of a DEV project card (extracted from DevProjectCard):
 * project screenshot under a dark scrim (subtle transform-only zoom on card
 * hover) with a diagonal glass sheen, or a terminal-flavored placeholder
 * (dot grid + `$ ./slug` prompt with blinking cursor) when the item has no
 * image in /public or the image fails to load (no broken img, ever).
 */

import React, { useState } from 'react';
import Image from 'next/image';
import type { Project } from '@/components/projects/types';
import { AMBER, light } from './devTheme';

const DevProjectCardMedia: React.FC<{ project: Project; wide: boolean }> = ({ project, wide }) => {
  const [broken, setBroken] = useState(false);
  const hasImage = Boolean(project.imageUrl) && !broken;

  return (
    <div
      className={`relative overflow-hidden border-b ${wide ? 'aspect-[16/9] sm:aspect-[21/9]' : 'aspect-[16/9]'}`}
      style={{ borderColor: light(0.08), background: '#101014' }}
    >
      {hasImage ? (
        <>
          <Image
            src={project.imageUrl as string}
            alt={project.title}
            fill
            sizes={wide ? '(min-width: 640px) 848px, 100vw' : '(min-width: 640px) 424px, 100vw'}
            className="object-cover object-top transition-transform duration-700 ease-out motion-safe:group-hover/card:scale-[1.04]"
            onError={() => setBroken(true)}
          />
          {/* Dark scrim melting the image into the card body */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{ background: 'linear-gradient(180deg, rgba(19,19,24,0.05) 30%, rgba(19,19,24,0.35) 72%, rgba(19,19,24,0.85) 100%)' }}
          />
          {/* Static diagonal sheen: premium glass feel without a cursor-chasing gimmick */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{ background: 'linear-gradient(115deg, rgba(244,244,245,0.07) 0%, transparent 38%)' }}
          />
        </>
      ) : (
        <div aria-hidden="true" className="absolute inset-0 flex flex-col items-center justify-center gap-3">
          <div
            className="absolute inset-0"
            style={{ backgroundImage: `radial-gradient(${light(0.9)} 1px, transparent 1px)`, backgroundSize: '22px 22px', opacity: 0.05 }}
          />
          <div className="absolute inset-0" style={{ background: 'radial-gradient(55% 65% at 50% 42%, rgba(224,145,47,0.08), transparent 70%)' }} />
          {project.icon && <span className="relative text-4xl">{project.icon}</span>}
          <p className="relative font-mono text-xs sm:text-sm" style={{ color: light(0.45) }}>
            <span style={{ color: AMBER }}>$</span> ./{project.slug ?? project.id}
            <span
              className="ml-1.5 inline-block h-[1em] w-[0.55em] translate-y-[0.2em] motion-safe:animate-pulse"
              style={{ background: 'rgba(224,145,47,0.8)' }}
            />
          </p>
        </div>
      )}
    </div>
  );
};

export default DevProjectCardMedia;
