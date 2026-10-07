'use client';

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { getProjectDetail } from '@/data/projectDetails';
import type { Project, ProjectsPageContent } from './types';
import { ProjectButton } from './ProjectButton';
import DetailEngineering from './detail/DetailEngineering';
import DetailFeatures from './detail/DetailFeatures';
import DetailHero from './detail/DetailHero';
import DetailProblem from './detail/DetailProblem';
import DetailResult from './detail/DetailResult';
import DetailSlides from './detail/DetailSlides';
import DetailStats from './detail/DetailStats';
import { getDetailUI } from './detail/detailUI';

interface ProjectDetailProps {
  project: Project;
  content: ProjectsPageContent;
}

// Block order answers, in sequence, the questions a business owner actually
// asks: what problem did it solve, what can it do, did it turn out well. The
// engineering block is kept but demoted to last, for technical visitors.
const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, content }) => {
  const { language } = useLanguage();
  const ui = getDetailUI(language);
  const slides = project.slides ?? [];
  const detail = getProjectDetail(project.slug, language);

  return (
    <main className="min-h-screen bg-gradient-to-b from-primary via-primary/95 to-primary text-white">
      <DetailHero project={project} ui={ui} />

      {detail && (
        <>
          <DetailProblem title={detail.problemTitle} paragraphs={detail.problem} />
          <DetailFeatures title={detail.featuresTitle} features={detail.features} />
        </>
      )}

      {slides.length > 0 && <DetailSlides slides={slides} project={project} />}

      {detail && (
        <>
          <DetailResult title={detail.resultTitle} items={detail.result} />
          <DetailStats title={detail.statsTitle} stats={detail.stats} />
          <DetailEngineering
            title={detail.highlightsTitle}
            note={detail.highlightsNote}
            items={detail.highlights}
          />
        </>
      )}

      {/* CTA */}
      <section className="px-6 pb-28 pt-4">
        <div className="container mx-auto flex max-w-3xl flex-col items-center rounded-3xl border border-custom-purple/30 bg-gradient-to-br from-custom-purple/30 via-primary to-primary px-8 py-14 text-center shadow-2xl shadow-custom-purple/20">
          <h2 className="text-3xl font-bold leading-tight md:text-4xl">{content.cta.title}</h2>
          <p className="mt-4 max-w-xl text-base text-secondary md:text-lg">{content.cta.subtitle}</p>
          <ProjectButton href="/contact" className="mt-8">
            {content.cta.button}
          </ProjectButton>
        </div>
      </section>
    </main>
  );
};

export default ProjectDetail;
