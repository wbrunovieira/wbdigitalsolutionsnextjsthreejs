'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { type Project, type ProjectsPageContent } from './types';

gsap.registerPlugin(ScrollTrigger);

interface FeaturedProjectProps {
  project: Project;
  content: ProjectsPageContent;
  onSelect: (project: Project) => void;
}

const FeaturedProject: React.FC<FeaturedProjectProps> = ({ project, content, onSelect }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (typeof window === 'undefined') return;

      // Content rise-in.
      if (contentRef.current) {
        gsap.from(contentRef.current.children, {
          opacity: 0,
          y: 40,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        });
      }

      // Image scrub parallax.
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { yPercent: -12 },
          {
            yPercent: 12,
            ease: 'none',
            scrollTrigger: {
              trigger: imageWrapRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      }
    },
    { scope: sectionRef }
  );

  const shortDescription = project.slides?.[0]?.description?.split('\n\n')[0] ?? project.description;

  return (
    <section ref={sectionRef} className="px-6 py-16 lg:py-24">
      <div className="container mx-auto grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Image */}
        <div
          ref={imageWrapRef}
          className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-custom-purple/30 shadow-2xl shadow-custom-purple/20 lg:aspect-[5/4]"
        >
          <div ref={imageRef} className="absolute inset-x-0 -inset-y-[14%]">
            {project.imageUrl ? (
              <Image
                src={project.imageUrl}
                alt={project.title}
                fill
                sizes="(max-width: 1024px) 90vw, 45vw"
                quality={90}
                priority
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-custom-purple/50 via-primary to-primary">
                <span className="text-7xl">{project.icon ?? '🗂️'}</span>
              </div>
            )}
          </div>
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/60 via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div ref={contentRef}>
          <span className="inline-flex items-center gap-2 rounded-full border border-yellowcustom/40 bg-yellowcustom/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-yellowcustom">
            ★ {content.featuredLabel}
          </span>

          <h2 className="mt-5 text-3xl font-bold leading-tight text-white lg:text-5xl">
            {project.title}
          </h2>

          {project.subtitle && (
            <p className="mt-3 text-sm font-semibold uppercase tracking-wider text-yellowcustom">
              {project.subtitle}
            </p>
          )}

          <p className="mt-5 max-w-xl text-base leading-relaxed text-secondary lg:text-lg">
            {shortDescription}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-custom-purple/30 bg-custom-purple/10 px-3 py-1 text-xs text-secondary"
              >
                {tech}
              </span>
            ))}
          </div>

          <button
            onClick={() => onSelect(project)}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-custom-purple to-yellowcustom px-7 py-3 font-semibold text-white shadow-lg shadow-custom-purple/30 transition-transform duration-300 hover:scale-105"
          >
            {content.viewProject}
            <span aria-hidden>→</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProject;
