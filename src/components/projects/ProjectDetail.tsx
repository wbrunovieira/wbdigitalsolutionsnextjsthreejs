'use client';

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { getProjectDetail } from '@/data/projectDetails';
import type { Project, ProjectsPageContent } from './types';
import { ProjectButton } from './ProjectButton';
import BulletList from './detail/BulletList';
import DetailFeatures from './detail/DetailFeatures';
import DetailHero from './detail/DetailHero';
import DetailSlides from './detail/DetailSlides';
import DetailStats from './detail/DetailStats';
import { getDetailUI } from './detail/detailUI';

interface ProjectDetailProps {
  project: Project;
  content: ProjectsPageContent;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, content }) => {
  const { language } = useLanguage();
  const ui = getDetailUI(language);
  const slides = project.slides ?? [];
  const detail = getProjectDetail(project.slug, language);

  return (
    <main className="min-h-screen bg-gradient-to-b from-primary via-primary/95 to-primary text-white">
      <DetailHero project={project} ui={ui} />

      {detail && <DetailStats stats={detail.stats} />}
      {detail && <DetailFeatures title={detail.featuresTitle} features={detail.features} />}

      <DetailSlides slides={slides} project={project} />

      {/* Engineering highlights */}
      {detail && (
        <section className="px-6 pb-20">
          <div className="container mx-auto max-w-4xl rounded-3xl border border-custom-purple/25 bg-primary/40 p-8 md:p-12">
            <h2 className="mb-8 text-2xl font-bold md:text-3xl">{detail.highlightsTitle}</h2>
            <BulletList
              items={detail.highlights}
              className="space-y-4"
              itemClassName="text-sm text-secondary md:text-base"
            />
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="px-6 pb-28">
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
