'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { type Project, type ProjectsPageContent } from './types';
import { ProjectButton } from './ProjectButton';

gsap.registerPlugin(ScrollTrigger);

interface FeaturedProjectProps {
  project: Project;
  content: ProjectsPageContent;
  onSelect: (project: Project) => void;
}

const FeaturedProject: React.FC<FeaturedProjectProps> = ({ project, content, onSelect }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageWrapRef = useRef<HTMLButtonElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (typeof window === 'undefined') return;

      // Content rise-in — reveal text + pills, but EXCLUDE the CTA (.js-cta).
      // A primary action must stay visible even if this scroll-trigger stalls;
      // animating it was leaving the button stuck at opacity 0.
      if (contentRef.current) {
        const revealItems = Array.from(contentRef.current.children).filter(
          (el) => !el.classList.contains('js-cta')
        );
        gsap.from(revealItems, {
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
        <button
          type="button"
          ref={imageWrapRef}
          onClick={() => onSelect(project)}
          aria-label={`${content.viewProject}: ${project.title}`}
          className="group relative isolate aspect-[4/3] w-full cursor-pointer overflow-hidden rounded-3xl border border-custom-purple/30 shadow-2xl shadow-custom-purple/20 transition-shadow duration-300 hover:shadow-custom-purple/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellowcustom/70 focus-visible:ring-offset-2 focus-visible:ring-offset-primary lg:aspect-[5/4]"
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
                className="object-cover blur-sm transition-[transform,filter] duration-500 ease-out group-hover:scale-105 group-hover:blur-0 motion-reduce:group-hover:scale-100"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-custom-purple/50 via-primary to-primary transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:group-hover:scale-100">
                <span className="text-7xl">{project.icon ?? '🗂️'}</span>
              </div>
            )}
          </div>
          {/* Brand-purple tint at rest; hover reveals the photo's original colors. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-custom-purple mix-blend-color transition-opacity duration-500 ease-out group-hover:opacity-0"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/60 via-transparent to-transparent" />
          {/* Hover hint so it's obvious the whole image opens the project. */}
          <span className="pointer-events-none absolute bottom-4 left-4 inline-flex translate-y-2 items-center gap-2 rounded-full bg-primary/80 px-4 py-2 text-sm font-semibold text-white opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            {content.viewProject}
            <span aria-hidden>→</span>
          </span>
        </button>

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

          <ProjectButton onClick={() => onSelect(project)} className="mt-8 js-cta">
            {content.viewProject}
          </ProjectButton>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProject;
