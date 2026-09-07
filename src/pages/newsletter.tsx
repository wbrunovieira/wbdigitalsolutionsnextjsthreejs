import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import PageHead from '@/components/PageHead';
import NewsletterInvite from '@/components/NewsletterInvite';
import NewsletterForm from '@/components/newsletter/NewsletterForm';
import NewsletterIntro from '@/components/newsletter/NewsletterIntro';
import NewsletterSuccess from '@/components/newsletter/NewsletterSuccess';
import { useNewsletterForm } from '@/components/newsletter/useNewsletterForm';
import { newsletterPageContent } from '@/content/newsletterPage';
import { makeI18nStaticProps } from '@/lib/i18n';

// Per-locale static generation: prerender this page for every locale with
// the right messages available during SSR.
export const getStaticProps = makeI18nStaticProps();

export default function NewsletterPage() {
  const { language } = useLanguage();
  const lang = language === 'pt' ? 'pt-BR' : language;
  const t = newsletterPageContent[lang] || newsletterPageContent['pt-BR'];

  const form = useNewsletterForm(t, lang);

  return (
    <>
      <PageHead pageKey="newsletter" customTitle="Newsletter | WB Digital Solutions" />

      <div className="min-h-screen bg-custom-gradient flex flex-col items-center justify-center px-4 py-16 relative overflow-hidden">
        {/* Glow blobs */}
        <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-[#792990]/20 rounded-full blur-[120px] pointer-events-none" aria-hidden="true" />
        <div className="absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] bg-[#ffb947]/10 rounded-full blur-[120px] pointer-events-none" aria-hidden="true" />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute top-6 left-6"
        >
          <Link href="/" className="text-white/40 hover:text-white/80 text-sm transition-colors duration-200">
            {t.backHome}
          </Link>
        </motion.div>

        <div className="w-full max-w-lg flex flex-col items-center gap-8">
          <NewsletterIntro t={t} />

          <AnimatePresence mode="wait">
            {form.status === 'success' ? <NewsletterSuccess t={t} /> : <NewsletterForm t={t} form={form} />}
          </AnimatePresence>

          {/* Quiet invite row while the form is still up; the success card shows the full block */}
          {form.status !== 'success' && <NewsletterInvite subtle />}
        </div>
      </div>
    </>
  );
}
