'use client';
import { useState } from 'react';
import useBlogTranslation from '@/contexts/useBlogTranslation';
import { AnimatePresence, motion } from 'framer-motion';
import PageHead from '@/components/PageHead';
import BlogCard from '@/components/blog/BlogCard';
import CategoryFilter from '@/components/blog/CategoryFilter';
import { SITE_BASE_URL } from '@/lib/seoUrls';
import type { GetStaticProps } from 'next';
import { i18nProps } from '@/lib/i18n';
import type { BlogTranslation } from '@/contexts/useBlogTranslation';

// Blog folder names don't match the URL locales (pt -> ptbr).
const BLOG_FOLDER: Record<string, string> = { en: 'en', pt: 'ptbr', it: 'it', es: 'es' };

type BlogIndexStrings = Pick<
  BlogTranslation,
  'title' | 'subtitle' | 'filterLabel' | 'allCategories' | 'loading' | 'noPosts'
>;

// What a card needs, prerendered per locale (see getStaticProps).
type BlogCardData = Pick<BlogTranslation, 'title' | 'category' | 'thumbnail' | 'summary'>;

// The blog-index UI strings must be server-rendered: useBlogTranslation loads
// them async on the client, so SSR otherwise fell back to a single language
// for every locale (the EN page even shipped pt-BR copy).
export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const folder = BLOG_FOLDER[locale ?? 'en'] ?? 'en';
  const blogIndex = (await import(`@/locales/blog/${folder}/blog-index.json`)).default;

  // Card data server-side too: useBlogTranslation only resolves in the browser,
  // so without this the prerendered HTML said "no posts found" to every crawler
  // and link preview. Only the fields the card renders are shipped.
  const cards: Record<string, BlogCardData> = {};
  for (const { id } of blogList) {
    const post = (await import(`@/locales/blog/${folder}/${id}.json`)).default as BlogTranslation;
    cards[id] = {
      title: post.title,
      category: post.category,
      thumbnail: post.thumbnail,
      summary: post.summary ?? '',
    };
  }

  return { props: { ...(await i18nProps(locale)), blogIndex, cards } };
};

const blogList = [
  { id: 'ai-agents-for-business' },
  { id: 'do-i-need-a-website' },
  { id: 'how-emotional-design-can' },
  { id: 'digital-can-transform-company' },
  { id: 'chatgpt-for-smes' },
  { id: 'increase-pme-sales' },
];

interface BlogIndexPageProps {
  blogIndex: BlogIndexStrings;
  cards: Record<string, BlogCardData>;
}

const BlogIndexPage: React.FC<BlogIndexPageProps> = ({ blogIndex, cards }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // The prerendered card is what renders on the server and on first paint; the
  // client hook takes over once it resolves (it also follows a language change).
  const blogTranslations = blogList.map(({ id }) => ({
    id,
    translation: useBlogTranslation(id) ?? cards[id] ?? null,
  }));

  const allCategories = new Set<string>();

  blogTranslations.forEach(({ translation }) => {
    if (translation) {
      translation.category.forEach((cat: string) => allCategories.add(cat));
    }
  });

  const filteredPosts = blogTranslations.filter(({ translation }) => {
    if (!translation) return false;
    return selectedCategory ? translation.category.includes(selectedCategory) : true;
  });

  return (
    <>
      <PageHead
        pageKey="blog"
        collection={{
          name: blogIndex?.title || 'Blog',
          description: blogIndex?.subtitle,
          url: `${SITE_BASE_URL}/blog`,
          // URL-only (post titles load via an async hook, absent at SSR); the
          // static ids keep the full collection enumerable in server HTML.
          items: blogList.map(({ id }) => ({ url: `${SITE_BASE_URL}/blog/${id}` })),
        }}
      />
      <div className="relative w-full min-h-screen overflow-hidden mt-32">
        <div className="text-center mb-8 p-2">
          <h1 className="text-5xl font-extrabold text-yellowcustom mt-16">
            {blogIndex?.title || 'Explore Our Articles'}
          </h1>
          <p className="text-white mt-2 text-lg">
            {blogIndex?.subtitle || 'Discover valuable insights on technology, digital marketing, and user experience.'}
          </p>
        </div>

        <CategoryFilter
          categories={[...allCategories]}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
          filterLabel={blogIndex?.filterLabel || 'Filter by category:'}
          allLabel={blogIndex?.allCategories || 'All'}
        />

        <motion.div
          className="px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mt-16"
          layout
        >
          <AnimatePresence mode="wait">
            {filteredPosts.length > 0 ? (
              filteredPosts.map(({ id, translation }, index) => (
                <BlogCard
                  key={id}
                  id={id}
                  translation={translation}
                  index={index}
                  loadingLabel={blogIndex?.loading || 'Loading...'}
                />
              ))
            ) : (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-gray-500 col-span-3"
              >
                {blogIndex?.noPosts || 'No posts found for this category.'}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </>
  );
};

export default BlogIndexPage;
