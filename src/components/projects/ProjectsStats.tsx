'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import type { ProjectsPageContent } from './types';

gsap.registerPlugin(ScrollTrigger);

interface ProjectsStatsProps {
  content: ProjectsPageContent['stats'];
}

// Capability pillars (not vanity numbers): each item is a short title (value)
// + a one-line descriptor (label).
const ProjectsStats: React.FC<ProjectsStatsProps> = ({ content }) => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (typeof window === 'undefined' || !sectionRef.current) return;

      gsap.from(sectionRef.current.querySelectorAll('[data-stat-item]'), {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="border-y border-custom-purple/20 bg-gradient-to-r from-primary via-custom-purple/20 to-primary px-6 py-16 lg:py-20"
    >
      <div className="container mx-auto">
        <h2 className="mb-12 text-center text-2xl font-bold text-white lg:text-3xl">
          {content.title}
        </h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {content.items.map((pillar) => (
            <div
              key={pillar.value}
              data-stat-item
              className="group rounded-2xl border border-custom-purple/20 bg-white/[0.02] p-6 text-center transition-colors duration-300 hover:border-yellowcustom/40"
            >
              <span className="mx-auto mb-4 block h-0.5 w-10 rounded-full bg-gradient-to-r from-yellowcustom to-custom-purple" />
              <h3 className="bg-gradient-to-r from-yellowcustom to-custom-purple bg-clip-text text-xl font-extrabold text-transparent lg:text-2xl">
                {pillar.value}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-secondary">{pillar.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsStats;
