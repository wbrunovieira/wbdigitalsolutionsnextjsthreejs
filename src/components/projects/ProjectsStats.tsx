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

// Split "5.000+" -> { prefix:"", num:5000, suffix:"+", sep:"." } so we can
// count up and re-insert the original thousands separator per locale.
function parseStat(value: string) {
  const m = value.match(/^(\D*)([\d.,]+)(\D*)$/);
  if (!m) return { prefix: '', num: null as number | null, suffix: value, sep: '' };
  const [, prefix, raw, suffix] = m;
  const sep = raw.includes('.') ? '.' : raw.includes(',') ? ',' : '';
  const num = parseInt(raw.replace(/[.,]/g, ''), 10);
  return { prefix, num, suffix, sep };
}

function format(num: number, sep: string) {
  if (!sep) return String(num);
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, sep);
}

const ProjectsStats: React.FC<ProjectsStatsProps> = ({ content }) => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (typeof window === 'undefined' || !sectionRef.current) return;
      const valueEls = sectionRef.current.querySelectorAll<HTMLElement>('[data-stat-value]');

      valueEls.forEach((el) => {
        const { prefix, num, suffix, sep } = parseStat(el.dataset.statValue ?? '');
        if (num === null) return;
        const counter = { v: 0 };
        gsap.to(counter, {
          v: num,
          duration: 1.6,
          ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
          onUpdate: () => {
            el.textContent = prefix + format(Math.round(counter.v), sep) + suffix;
          },
        });
      });

      gsap.from(sectionRef.current.querySelectorAll('[data-stat-item]'), {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });
    },
    { scope: sectionRef }
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
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {content.items.map((stat) => (
            <div key={stat.label} data-stat-item className="text-center">
              <p
                data-stat-value={stat.value}
                className="bg-gradient-to-r from-yellowcustom to-custom-purple bg-clip-text text-4xl font-extrabold text-transparent lg:text-5xl"
              >
                {stat.value}
              </p>
              <p className="mt-2 text-sm text-secondary lg:text-base">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsStats;
