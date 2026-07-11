import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import PageHead from '@/components/PageHead';
import { makeI18nStaticProps } from '@/lib/i18n';
import { PRIVACY_CONTENT } from '@/content/privacyPolicy';

export const getStaticProps = makeI18nStaticProps();

export default function PrivacyPolicyPage() {
  const { language } = useLanguage();
  const lang = (language === 'pt' ? 'pt-BR' : language) as keyof typeof PRIVACY_CONTENT;
  const t = PRIVACY_CONTENT[lang] || PRIVACY_CONTENT['pt-BR'];

  return (
    <>
      <PageHead
        pageKey="privacy-policy"
        customTitle={t.metaTitle}
        customDescription={t.metaDescription}
        canonicalPath="/privacy-policy"
      />

      <main className="min-h-screen bg-custom-gradient px-5 py-16 sm:px-6 md:py-24">
        <article className="mx-auto w-full max-w-3xl text-white">
          <Link
            href="/"
            className="text-sm text-white/40 transition-colors duration-200 hover:text-white/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellowcustom/70"
          >
            {t.backHome}
          </Link>

          <h1 className="mt-6 text-3xl font-extrabold sm:text-4xl">{t.title}</h1>
          <p className="mt-2 text-sm text-secondary/70">
            {t.lastUpdatedLabel}: {t.lastUpdatedDate}
          </p>
          <p className="mt-6 text-base leading-relaxed text-secondary">{t.intro}</p>

          <div className="mt-10 flex flex-col gap-9">
            {t.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-lg font-bold text-white sm:text-xl">{section.heading}</h2>
                {section.paragraphs?.map((p, i) => (
                  <p key={i} className="mt-3 text-sm leading-relaxed text-secondary sm:text-base">
                    {p}
                  </p>
                ))}
                {section.bullets && (
                  <ul className="mt-3 flex flex-col gap-2">
                    {section.bullets.map((b, i) => (
                      <li key={i} className="flex gap-2 text-sm leading-relaxed text-secondary sm:text-base">
                        <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-yellowcustom" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>
        </article>
      </main>
    </>
  );
}
