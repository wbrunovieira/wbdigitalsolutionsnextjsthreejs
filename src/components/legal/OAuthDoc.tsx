import Link from 'next/link';
import PageHead from '@/components/PageHead';
import { useLanguage } from '@/contexts/LanguageContext';
import type { DocLocale, OAuthDocContent, OAuthSection } from '@/content/oauthPrivacy';

interface OAuthDocProps {
  /** One entry per app locale; pt-BR is the authoritative wording. */
  content: Record<DocLocale, OAuthDocContent>;
  /** Self canonical, e.g. "/privacidade". */
  canonicalPath: string;
  pageKey: string;
}

const linkClass =
  'text-yellowcustom underline underline-offset-4 transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellowcustom/70';

/** A section's optional reference: off-site links open in a new tab, in-site ones do not. */
const SectionLink: React.FC<{ link: NonNullable<OAuthSection['link']> }> = ({ link }) =>
  link.href.startsWith('http') ? (
    <a href={link.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
      {link.label}
    </a>
  ) : (
    <Link href={link.href} className={linkClass}>
      {link.label}
    </Link>
  );

/**
 * Renderer for the OAuth application's legal documents (/privacidade, /termos).
 *
 * Google validates these URLs automatically, so the page must stay a plain
 * server-rendered document: HTTP 200, no auth, no noindex, no redirect off the
 * domain, and the text visible as HTML rather than behind a download.
 */
const OAuthDoc: React.FC<OAuthDocProps> = ({ content, canonicalPath, pageKey }) => {
  const { language } = useLanguage();
  const lang = (language === 'pt' ? 'pt-BR' : language) as DocLocale;
  const t = content[lang] || content['pt-BR'];

  return (
    <>
      <PageHead
        pageKey={pageKey}
        customTitle={t.metaTitle}
        customDescription={t.metaDescription}
        canonicalPath={canonicalPath}
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
                {section.paragraphs.map((p, i) => (
                  <p key={i} className="mt-3 text-sm leading-relaxed text-secondary sm:text-base">
                    {p}
                  </p>
                ))}
                {section.link && (
                  <p className="mt-3 break-words text-sm leading-relaxed sm:text-base">
                    <SectionLink link={section.link} />
                  </p>
                )}
              </section>
            ))}
          </div>
        </article>
      </main>
    </>
  );
};

export default OAuthDoc;
