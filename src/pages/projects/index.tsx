import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { makeI18nStaticProps } from '@/lib/i18n';
import { useTranslations } from '@/contexts/TranslationContext';
import PageHead from '@/components/PageHead';
import ProjectFilters from '@/components/projects/ProjectFilters';
import FeaturedProject from '@/components/projects/FeaturedProject';
import ProjectsGrid from '@/components/projects/ProjectsGrid';
import ProjectsStats from '@/components/projects/ProjectsStats';
import ProjectsCTA from '@/components/projects/ProjectsCTA';
import ProjectModal from '@/components/projects/ProjectModal';
import type { Project, ProjectCategory, ProjectsPageContent } from '@/components/projects/types';

const ProjectsHero3D = dynamic(() => import('@/components/projects/ProjectsHero3D'), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-[80vh] items-center justify-center">
      <div className="text-secondary">Loading 3D Experience...</div>
    </div>
  ),
});

const ProjectsPage: React.FC = () => {
  const router = useRouter();
  const content = useTranslations().projectsPage as ProjectsPageContent;
  const [filter, setFilter] = useState<ProjectCategory>('all');
  const [selected, setSelected] = useState<Project | null>(null);

  const items = content.items;
  const featured = items[0];
  const rest = items.slice(1);
  const matchesFilter = (p: Project) =>
    p.category === filter || (p.categories?.includes(filter as Exclude<ProjectCategory, 'all'>) ?? false);
  const gridProjects = filter === 'all' ? rest : items.filter(matchesFilter);

  // Projects with a dedicated page navigate to it; the rest open the modal.
  const handleSelect = (project: Project) => {
    // void: fire-and-forget navigation; Next.js surfaces routing errors itself.
    if (project.slug) void router.push(`/projects/${project.slug}`);
    else setSelected(project);
  };

  return (
    <>
      <PageHead pageKey="projects" />

      <main className="min-h-screen bg-gradient-to-b from-primary via-primary/95 to-primary">
        {/* 3D hero — floating, clickable project cards */}
        <ProjectsHero3D onCategorySelect={setFilter} />

        <ProjectFilters value={filter} onChange={setFilter} labels={content.filters} />

        {filter === 'all' && featured && (
          <FeaturedProject project={featured} content={content} onSelect={handleSelect} />
        )}

        <ProjectsGrid
          projects={gridProjects}
          content={content}
          filter={filter}
          onSelect={handleSelect}
        />

        <ProjectsStats content={content.stats} />

        <ProjectsCTA content={content.cta} />
      </main>

      {selected && (
        <ProjectModal isOpen onClose={() => setSelected(null)} project={selected} />
      )}
    </>
  );
};

// Prerender per locale with SSR-correct messages (built-in Next i18n).
export const getStaticProps = makeI18nStaticProps();

export default ProjectsPage;
