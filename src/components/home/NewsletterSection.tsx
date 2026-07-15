'use client';
import { motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import NewsletterInline, { NEWSLETTER_COPY } from '../NewsletterInline';

// Newsletter call-out that closes the home page. A gradient-bordered card that
// reads as its own crafted section (clear separation from the cards above),
// with a scroll-reveal gated behind reduced-motion. Copy comes from the shared
// NEWSLETTER_COPY record so it stays in sync with the footer/inline form.
const NewsletterSection: React.FC = () => {
  const { language } = useLanguage();
  const lang = (language === 'pt' ? 'pt-BR' : language) as keyof typeof NEWSLETTER_COPY;
  const t = NEWSLETTER_COPY[lang] || NEWSLETTER_COPY['pt-BR'];
  const reduce = useReducedMotion();

  return (
    <section className="relative w-full overflow-hidden px-6 py-24 sm:py-32">
      {/* Soft glow, kept inside this section (decorations group with their own section). */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[360px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#792990]/20 blur-[130px]"
      />
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 28 }}
        whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative mx-auto w-full max-w-2xl"
      >
        {/* Gradient border: brand purple -> yellow, wrapping a solid dark card. */}
        <div className="rounded-3xl bg-gradient-to-br from-[#792990] via-[#792990]/40 to-[#ffb947]/70 p-px shadow-2xl shadow-[#792990]/20">
          <div className="rounded-[calc(1.5rem-1px)] bg-[#1a0826]/90 px-8 py-12 text-center backdrop-blur-sm sm:px-14 sm:py-14">
            <span className="inline-block rounded-full border border-[#792990] bg-[#792990]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-yellowcustom">
              Newsletter
            </span>
            <h2 className="mt-5 text-balance text-3xl font-extrabold leading-tight text-white sm:text-4xl">
              {t.heading}
            </h2>
            <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-secondary sm:text-base">
              {t.sub}
            </p>
            <div className="mx-auto mt-8 max-w-md text-left">
              <NewsletterInline formOnly />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default NewsletterSection;
