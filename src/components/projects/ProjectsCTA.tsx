'use client';

import React, { useRef } from 'react';
import { ProjectButton } from './ProjectButton';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import type { ProjectsPageContent } from './types';

gsap.registerPlugin(ScrollTrigger);

interface ProjectsCTAProps {
  content: ProjectsPageContent['cta'];
}

const ProjectsCTA: React.FC<ProjectsCTAProps> = ({ content }) => {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (typeof window === 'undefined' || !ref.current) return;
      gsap.from(ref.current.children, {
        opacity: 0,
        y: 40,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.15,
        scrollTrigger: { trigger: ref.current, start: 'top 85%' },
      });
    },
    { scope: ref },
  );

  return (
    <section className="px-6 py-20 lg:py-28">
      <div
        ref={ref}
        className="container mx-auto flex max-w-3xl flex-col items-center rounded-3xl border border-custom-purple/30 bg-gradient-to-br from-custom-purple/30 via-primary to-primary px-8 py-14 text-center shadow-2xl shadow-custom-purple/20"
      >
        <h2 className="text-3xl font-bold leading-tight text-white lg:text-4xl">{content.title}</h2>
        <p className="mt-4 max-w-xl text-base text-secondary lg:text-lg">{content.subtitle}</p>
        <ProjectButton href="/contact" className="mt-8">
          {content.button}
        </ProjectButton>
      </div>
    </section>
  );
};

export default ProjectsCTA;
