'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logo from '/public/svg/logo-white.svg';
import { useTranslations } from '@/contexts/TranslationContext';
import { useLanguage } from '@/contexts/LanguageContext';
import NewsletterInline, { NEWSLETTER_COPY } from './NewsletterInline';
import { FaInstagram, FaFacebookF, FaYoutube, FaTiktok } from 'react-icons/fa';
import { FiPhone, FiMail } from 'react-icons/fi';
import { SiWhatsapp } from 'react-icons/si';

const PRIVACY_LABEL: Record<string, string> = {
  'pt-BR': 'Política de Privacidade',
  en: 'Privacy Policy',
  es: 'Política de Privacidad',
  it: 'Informativa sulla Privacy',
};

const MANAGE_COOKIES_LABEL: Record<string, string> = {
  'pt-BR': 'Gerenciar cookies',
  en: 'Manage cookies',
  es: 'Gestionar cookies',
  it: 'Gestisci i cookie',
};

// Short reassurance under the footer newsletter title (the full value prop lives
// in NEWSLETTER_COPY; the footer keeps a tighter line for a cleaner hierarchy).
const NEWSLETTER_NOTE: Record<string, string> = {
  'pt-BR': 'Sem spam. Cancele quando quiser.',
  en: 'No spam. Unsubscribe anytime.',
  es: 'Sin spam. Cancela cuando quieras.',
  it: 'Niente spam. Cancellati quando vuoi.',
};

// Shared footer typography: one label + one link style so every column matches.
const FOOTER_LABEL = 'text-xs font-semibold uppercase tracking-[0.2em] text-yellowcustom';
const FOOTER_LINK =
  'text-sm text-secondary transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellowcustom/50 focus-visible:rounded-sm';
const FOOTER_CONTACT =
  'inline-flex items-center justify-center gap-2.5 text-sm text-secondary transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellowcustom/50 focus-visible:rounded-sm md:justify-start';

const Footer: React.FC = () => {
  const currentMessages = useTranslations();
  const { language } = useLanguage();
  const lang = language === 'pt' ? 'pt-BR' : language;
  const privacyLabel = PRIVACY_LABEL[lang] ?? PRIVACY_LABEL['pt-BR'];
  const manageCookiesLabel = MANAGE_COOKIES_LABEL[lang] ?? MANAGE_COOKIES_LABEL['pt-BR'];
  const nl = NEWSLETTER_COPY[lang] ?? NEWSLETTER_COPY['pt-BR'];
  const nlNote = NEWSLETTER_NOTE[lang] ?? NEWSLETTER_NOTE['pt-BR'];

  return (
    <footer className="bg-modern-gradient text-white px-6 py-10 lg:px-10 mt-32">

      <div className="container mx-auto mt-8 grid grid-cols-1 gap-10 text-center sm:grid-cols-2 md:text-left lg:grid-cols-4 lg:gap-0">
        {/* Brand */}
        <div className="flex flex-col items-center md:items-start lg:pr-8">
          <Image src={logo} alt="WB Digital Solutions" width={158} height={42} className="w-44 h-auto object-contain" />
          {/* Social chips */}
          <div className="mt-7 flex gap-3">
            {[
              { href: 'https://www.instagram.com/wb.digitalsolutions/', label: 'Instagram', icon: <FaInstagram aria-hidden="true" /> },
              { href: 'https://www.facebook.com/wb.digitalsolutions', label: 'Facebook', icon: <FaFacebookF aria-hidden="true" /> },
              { href: 'https://www.youtube.com/@wbdigitalsolutions', label: 'YouTube', icon: <FaYoutube aria-hidden="true" /> },
              { href: 'https://www.tiktok.com/@wb.digitalsolutions', label: 'TikTok', icon: <FaTiktok aria-hidden="true" /> },
            ].map((s) => (
              <Link
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/5 text-white transition-colors hover:border-yellowcustom/40 hover:bg-yellowcustom hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellowcustom/60"
              >
                {s.icon}
              </Link>
            ))}
          </div>
        </div>

        {/* Contatos */}
        <div className="lg:border-l lg:border-white/[0.08] lg:pl-8">
          <h4 className={FOOTER_LABEL}>{currentMessages.contacts}</h4>
          <div className="mt-3 flex flex-col items-center gap-2.5 md:items-start">
            <a href="tel:+551150264203" className={FOOTER_CONTACT}>
              <FiPhone aria-hidden="true" className="text-yellowcustom" />
              {currentMessages.brazil}: +55 11 5026-4203
            </a>
            <a href="mailto:bruno@wbdigitalsolutions.com" className={FOOTER_CONTACT}>
              <FiMail aria-hidden="true" className="text-yellowcustom" />
              bruno@wbdigitalsolutions.com
            </a>
            <a href="https://wa.me/5511982864581" target="_blank" rel="noopener noreferrer" className={FOOTER_CONTACT}>
              <SiWhatsapp aria-hidden="true" className="text-yellowcustom" />
              +55 11 98286-4581
            </a>
          </div>
        </div>

        {/* Services */}
        <div className="lg:border-l lg:border-white/[0.08] lg:pl-8">
          <h4 className={FOOTER_LABEL}>{currentMessages.artificialIntelligence}</h4>
          <ul className="mt-3 space-y-2.5">
            <li><Link href="/automation" className={FOOTER_LINK}>{currentMessages.process}</Link></li>
            <li><Link href="/automation" className={FOOTER_LINK}>{currentMessages.assistant}</Link></li>
            <li><Link href="/ai" className={FOOTER_LINK}>{currentMessages.analizy}</Link></li>
            <li><Link href="/ai" className={FOOTER_LINK}>{currentMessages.dataManagement}</Link></li>
          </ul>
        </div>

        {/* Recent blogs */}
        <div className="lg:border-l lg:border-white/[0.08] lg:pl-8">
          <h4 className={FOOTER_LABEL}>{currentMessages.recentBlogs}</h4>
          <ul className="mt-3 space-y-2.5">
            <li><Link href="/blog/do-i-need-a-website" className={FOOTER_LINK}>{currentMessages.diINeedSite}</Link></li>
            <li><Link href="/blog/how-emotional-design-can" className={FOOTER_LINK}>{currentMessages.DesignEmotional}</Link></li>
          </ul>
        </div>
      </div>

      {/* Modern divider: a hairline that fades out at both ends */}
      <div aria-hidden="true" className="container mx-auto mt-12 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      {/* Newsletter strip */}
      <div className="container mx-auto mt-10 pt-2">
        <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 text-center sm:flex-row sm:items-center sm:justify-between sm:gap-10 sm:text-left">
          {/* Value hook — the dominant element */}
          <div className="flex items-start justify-center gap-3.5 sm:justify-start">
            <span
              aria-hidden="true"
              className="mt-0.5 grid h-11 w-11 shrink-0 place-items-center rounded-full bg-yellowcustom/15 text-yellowcustom"
            >
              <FiMail className="text-xl" />
            </span>
            <div>
              <p className="text-lg font-bold leading-snug text-white">{nl.heading}</p>
              <p className="mt-1 text-sm text-secondary">{nlNote}</p>
            </div>
          </div>
          {/* Action */}
          <div className="w-full shrink-0 sm:w-auto sm:min-w-[22rem]">
            <NewsletterInline formOnly />
          </div>
        </div>
      </div>

      <div className="bg-primary py-4 mt-8 text-center">
        <p className="text-secondary text-sm">
          © WBDIGITALSOLUTIONS | {currentMessages.allRightsReserved}
        </p>
        <div className="mt-1 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-secondary">
          <Link href="/privacy-policy" className="underline underline-offset-2 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellowcustom/70">
            {privacyLabel}
          </Link>
          <span aria-hidden="true" className="opacity-40">·</span>
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event('wb-open-consent'))}
            className="underline underline-offset-2 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellowcustom/70"
          >
            {manageCookiesLabel}
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;