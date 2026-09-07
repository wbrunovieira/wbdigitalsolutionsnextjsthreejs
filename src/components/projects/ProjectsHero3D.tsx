'use client';

import React, { Suspense, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import CanvasErrorBoundary from '@/components/CanvasErrorBoundary';
import { useLanguage } from '@/contexts/LanguageContext';
import { ProjectButton } from './ProjectButton';
import HeroStage from './hero3d/HeroStage';
import HeroTitle from './hero3d/HeroTitle';
import { useCarouselDrag } from './hero3d/useCarouselDrag';
import {
  CTA_LABELS,
  getHeroContent,
  getShowcaseProjects,
  ProjectCategory,
} from './hero3d/heroContent';

const BACKGROUND = '#1a0526';

interface ProjectsHero3DProps {
  onCategorySelect: (category: ProjectCategory) => void;
}

const ProjectsHero3D: React.FC<ProjectsHero3DProps> = ({ onCategorySelect }) => {
  const { language } = useLanguage();
  const lang = language === 'pt' ? 'pt-BR' : language;
  const ctaLabel = CTA_LABELS[lang] ?? CTA_LABELS.en;

  const content = useMemo(() => getHeroContent(lang), [lang]);
  const projects = useMemo(() => getShowcaseProjects(lang), [lang]);

  const { targetRotation, dragging, didDrag, onPointerDown, onPointerMove, endDrag } = useCarouselDrag();

  const scrollToGrid = () => {
    document.getElementById('projects-grid')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#1a0526]">
      {/* Title band — sits above the 3D, never over it */}
      <HeroTitle content={content} />

      {/* 3D carousel — explicit height so it never collapses */}
      <div
        className="relative h-[64vh] min-h-[460px] w-full cursor-grab active:cursor-grabbing"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
      >
        <CanvasErrorBoundary>
          <Canvas
            gl={{ antialias: true, alpha: false }}
            dpr={[1, 1.5]}
            camera={{ position: [0, 0.4, 9.5], fov: 38 }}
          >
            <color attach="background" args={[BACKGROUND]} />
            <fog attach="fog" args={[BACKGROUND, 10, 22]} />
            <Suspense fallback={null}>
              <HeroStage
                projects={projects}
                ctaLabel={ctaLabel}
                onSelect={onCategorySelect}
                targetRotation={targetRotation}
                dragging={dragging}
                didDrag={didDrag}
              />
            </Suspense>
          </Canvas>
        </CanvasErrorBoundary>

        {/* Explore CTA */}
        <div className="pointer-events-none absolute inset-x-0 bottom-8 z-10 flex justify-center">
          <ProjectButton
            onClick={scrollToGrid}
            className="pointer-events-auto"
            icon={
              <svg className="h-4 w-4 animate-bounce motion-reduce:animate-none" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            }
          >
            {content.explore}
          </ProjectButton>
        </div>
      </div>
    </section>
  );
};

export default ProjectsHero3D;
