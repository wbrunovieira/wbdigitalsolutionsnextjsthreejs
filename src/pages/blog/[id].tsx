import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import BlogPost from '@/components/BlogPost';
import Link from 'next/link';
import PageHead from '@/components/PageHead';
import { useLanguage } from '@/contexts/LanguageContext';
import fs from 'fs';
import path from 'path';
import { i18nProps, I18nPageProps } from '@/lib/i18n';

// List of all blog post IDs
const blogPostIds = [
  'do-i-need-a-website',
  'how-emotional-design-can',
  'digital-can-transform-company',
  'chatgpt-for-smes',
  'increase-pme-sales',
];

// List of supported languages
const languages = ['en', 'es', 'it', 'ptbr'];

// URL locale -> blog content folder under src/locales/blog/
const URL_LOCALE_TO_BLOG_FOLDER: Record<string, string> = {
  en: 'en',
  pt: 'ptbr',
  it: 'it',
  es: 'es',
};

// Shape of one article section, matching the BlogPost component's text prop.
interface BlogSection {
  title: string;
  content: string[];
  quotes?: { text: string; author: string }[];
}

interface BlogTranslation {
  title: string;
  summary?: string;
  text: BlogSection[];
  images?: string[];
  thumbnail?: string;
  category: string[];
  author?: string;
  datePublished?: string;
}

interface BlogPageProps {
  translations: Record<string, BlogTranslation>;
  postId: string;
  ssrLangKey: string;
}

const BlogPage: React.FC<BlogPageProps> = ({ translations, ssrLangKey }) => {
  const router = useRouter();
  const { language } = useLanguage();
  // Start from the URL locale's content so the SSR HTML is in the right language.
  const [translation, setTranslation] = useState<BlogTranslation | null>(
    () => translations?.[ssrLangKey] || translations?.['en'] || null,
  );

  useEffect(() => {
    // Get the translation for the current language
    const langKey = (language === 'pt' || language === 'pt-BR') ? 'ptbr' : language;
    const currentTranslation = translations[langKey] || translations['en'];
    setTranslation(currentTranslation);
  }, [language, translations]);

  // Show loading state while page is being generated
  if (router.isFallback || !translation) {
    return <p className="text-center text-gray-500 mt-10">Carregando...</p>;
  }

  // Extract description from text array
  const getDescription = () => {
    if (translation.summary) return translation.summary;
    if (Array.isArray(translation.text) && translation.text.length > 0) {
      const firstSection = translation.text[0];
      if (firstSection.content && Array.isArray(firstSection.content)) {
        return firstSection.content[0].substring(0, 160);
      }
    }
    return translation.title;
  };

  return (
    <>
      <PageHead
        pageKey="blog"
        customTitle={`${translation.title} | WB Blog`}
        blogPost={{
          title: translation.title,
          description: getDescription(),
          author: translation.author || 'WB Digital Solutions',
          datePublished: translation.datePublished || '2024-01-01T00:00:00Z',
          images: translation.images || (translation.thumbnail ? [translation.thumbnail] : undefined),
        }}
      />
      <div className="bg-modern-gradient min-h-screen py-12 mt-32">
        <div className="mt-10 mb-10 text-center">
          <Link href="/blog">
            <button className="px-6 py-2 bg-yellowcustom text-primary font-semibold rounded-lg shadow-md hover:bg-yellowcustom/70 transition duration-300">
              ← {language === 'pt' || language === 'ptbr' ? 'Voltar ao Blog' : 
                  language === 'es' ? 'Volver al Blog' :
                  language === 'it' ? 'Torna al Blog' :
                  'Back to Blog'}
            </button>
          </Link>
        </div>
        <BlogPost
          title={translation.title}
          text={translation.text}
          images={translation.images || []}
          category={translation.category}
          author={translation.author || 'WB Digital Solutions'}
        />
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  // With built-in i18n, paths without a locale only build the default locale,
  // so emit every post id for every configured locale.
  const paths = blogPostIds.flatMap(id =>
    (locales ?? [undefined]).map(locale => ({
      params: { id },
      locale,
    })),
  );

  return {
    paths,
    fallback: false, // false means 404 for non-existent pages
  };
};

export const getStaticProps: GetStaticProps<BlogPageProps & I18nPageProps> = async ({
  params,
  locale,
}) => {
  const postId = params?.id as string;

  // Validate that the post ID exists
  if (!blogPostIds.includes(postId)) {
    return {
      notFound: true,
    };
  }

  // Load translations for all languages
  const translations: Record<string, BlogTranslation> = {};
  
  for (const lang of languages) {
    try {
      const filePath = path.join(process.cwd(), 'src', 'locales', 'blog', lang, `${postId}.json`);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      translations[lang] = JSON.parse(fileContent) as BlogTranslation;
    } catch (error) {
      console.error(`Error loading blog post ${postId} for language ${lang}:`, error);
      // If a translation doesn't exist, we'll skip it
    }
  }

  // Make sure we have at least English translation
  if (!translations['en']) {
    return {
      notFound: true,
    };
  }

  // Resolve the URL locale to its content folder key (en/es/it/ptbr) so the
  // server render carries the right language; client language switch still works.
  const ssrLangKey = URL_LOCALE_TO_BLOG_FOLDER[locale ?? 'en'] ?? 'en';

  return {
    props: {
      translations,
      postId,
      ssrLangKey,
      ...(await i18nProps(locale)),
    },
    revalidate: 3600, // Revalidate every hour
  };
};

export default BlogPage;