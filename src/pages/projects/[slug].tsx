import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useTranslations } from '@/contexts/TranslationContext';
import PageHead from '@/components/PageHead';
import ProjectDetail from '@/components/projects/ProjectDetail';
import type { ProjectsPageContent } from '@/components/projects/types';

const ProjectDetailPage: React.FC = () => {
  const router = useRouter();
  const { slug } = router.query;
  const content = useTranslations().projectsPage as ProjectsPageContent;

  const project = content?.items?.find((p) => p.slug === slug);

  if (!router.isReady) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-primary text-secondary">
        <span>Loading…</span>
      </main>
    );
  }

  if (!project) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-primary px-6 text-center text-white">
        <p className="text-xl text-secondary">404</p>
        <Link href="/projects" className="text-yellowcustom hover:underline">
          ← {content?.title ?? 'Projects'}
        </Link>
      </main>
    );
  }

  return (
    <>
      <PageHead
        pageKey="projects"
        customTitle={`${project.title} · WB Digital Solutions`}
        customDescription={project.description}
        customImage={project.imageUrl}
      />
      <ProjectDetail project={project} content={content} />
    </>
  );
};

export default ProjectDetailPage;
