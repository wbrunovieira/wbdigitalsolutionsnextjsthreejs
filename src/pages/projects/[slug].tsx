import React from 'react';
import type { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import { i18nProps } from '@/lib/i18n';
import { PROJECT_DETAILS } from '@/data/projectDetails';
import { useTranslations } from '@/contexts/TranslationContext';
import PageHead from '@/components/PageHead';
import ProjectDetail from '@/components/projects/ProjectDetail';
import type { ProjectsPageContent } from '@/components/projects/types';

// SSR meta resolved per slug+locale in getStaticProps (crawlers and social
// scrapers read the raw HTML, so title/og/canonical/hreflang must be there).
// image is null when the project has no custom card (PageHead falls back to
// the default og image); getStaticProps can't serialize `undefined`.
type ProjectSeo = { title: string; description: string; image: string | null; path: string };

// The slug comes from getStaticProps, NOT from router.query: on a prerendered
// page the router is not ready during the build, so gating the body on
// router.isReady shipped "Loading…" as the entire HTML of all 14 project pages.
const ProjectDetailPage: React.FC<{ seo: ProjectSeo | null; slug: string }> = ({ seo, slug }) => {
  const content = useTranslations().projectsPage as ProjectsPageContent;
  const project = content?.items?.find((p) => p.slug === slug);

  return (
    <>
      {seo && (
        <PageHead
          pageKey="projects"
          customTitle={`${seo.title} · WB Digital Solutions`}
          customDescription={seo.description}
          customImage={seo.image ?? undefined}
          canonicalPath={seo.path}
        />
      )}
      {!project ? (
        <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-primary px-6 text-center text-white">
          <p className="text-xl text-secondary">404</p>
          <Link href="/projects" className="text-yellowcustom hover:underline">
            ← {content?.title ?? 'Projects'}
          </Link>
        </main>
      ) : (
        <ProjectDetail project={project} content={content} />
      )}
    </>
  );
};

// One path per project slug x locale so every locale variant is prerendered.
// PROJECT_DETAILS is the single source of slugs (also used by the sitemap API).
export const getStaticPaths: GetStaticPaths = async ({ locales }) => ({
  paths: Object.keys(PROJECT_DETAILS).flatMap((slug) =>
    (locales ?? []).map((locale) => ({ params: { slug }, locale })),
  ),
  fallback: false,
});

// Resolve the project's localized SEO fields AND the slug server-side, so both
// the head and the body are in the prerendered HTML.
export const getStaticProps: GetStaticProps = async ({ locale, params }) => {
  const base = await i18nProps(locale);
  const slug = String(params?.slug ?? '');
  const items =
    (base.i18n.messages as unknown as {
      projectsPage?: { items?: Array<{ slug: string; title: string; description: string; imageUrl: string }> };
    }).projectsPage?.items ?? [];
  const match = items.find((p) => p.slug === slug);
  const seo: ProjectSeo | null = match
    ? { title: match.title, description: match.description, image: match.imageUrl ?? null, path: `/projects/${slug}` }
    : null;
  return { props: { ...base, seo, slug } };
};

export default ProjectDetailPage;
