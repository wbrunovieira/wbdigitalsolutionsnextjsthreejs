'use client';

import { useState } from 'react';
import { FaWhatsapp, FaLinkedinIn, FaEnvelope, FaInstagram, FaCheck } from 'react-icons/fa';

interface BlogShareProps {
  title: string;
  language?: string;
}

/** Localized share copy. A Record covers all 4 site locales (i18n rule). */
const SHARE_T: Record<string, { heading: string; sub: string; copied: string }> = {
  en: {
    heading: 'Did this help you?',
    sub: 'Share it with someone who could use it too.',
    copied: 'Link copied, paste it in your Instagram story or bio.',
  },
  pt: {
    heading: 'Este texto te ajudou?',
    sub: 'Compartilhe com alguém que também pode se beneficiar.',
    copied: 'Link copiado, cole no seu story ou bio do Instagram.',
  },
  it: {
    heading: 'Questo articolo ti è stato utile?',
    sub: 'Condividilo con qualcuno che potrebbe trovarlo utile.',
    copied: 'Link copiato, incollalo nella tua storia o bio di Instagram.',
  },
  es: {
    heading: '¿Te ha servido este texto?',
    sub: 'Compártelo con alguien a quien también pueda ayudar.',
    copied: 'Enlace copiado, pégalo en tu historia o bio de Instagram.',
  },
};

const localeKey = (l?: string) => (l === 'ptbr' || l === 'pt-BR' ? 'pt' : l ?? 'en');

const BlogShare: React.FC<BlogShareProps> = ({ title, language }) => {
  const t = SHARE_T[localeKey(language)] ?? SHARE_T.en;
  const [copied, setCopied] = useState(false);

  const currentUrl = () =>
    typeof window !== 'undefined' ? window.location.href : 'https://www.wbdigitalsolutions.com';

  const openShare = (url: string) => window.open(url, '_blank', 'noopener,noreferrer');

  const whatsapp = () =>
    openShare(`https://wa.me/?text=${encodeURIComponent(`${title} ${currentUrl()}`)}`);
  const linkedin = () =>
    openShare(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl())}`);
  const email = () => {
    window.location.href = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(
      `${title}\n\n${currentUrl()}`,
    )}`;
  };
  // Instagram has no web share intent; copy the link so it can be pasted into a story/bio/DM.
  const instagram = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl());
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      /* clipboard blocked; no-op */
    }
  };

  const btn =
    'flex h-12 w-12 items-center justify-center rounded-full text-white shadow-md transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-yellowcustom';

  return (
    <div className="mx-auto mt-14 max-w-2xl rounded-2xl bg-gray-50 p-8 text-center">
      <h3 className="text-xl font-bold text-primary">{t.heading}</h3>
      <p className="mt-1 text-gray-600">{t.sub}</p>
      <div className="mt-5 flex items-center justify-center gap-4">
        <button type="button" onClick={whatsapp} aria-label="WhatsApp" className={`${btn} bg-[#25D366]`}>
          <FaWhatsapp className="text-2xl" />
        </button>
        <button type="button" onClick={linkedin} aria-label="LinkedIn" className={`${btn} bg-[#0A66C2]`}>
          <FaLinkedinIn className="text-xl" />
        </button>
        <button type="button" onClick={instagram} aria-label="Instagram" className={`${btn} bg-gradient-to-tr from-[#feda75] via-[#d62976] to-[#4f5bd5]`}>
          {copied ? <FaCheck className="text-xl" /> : <FaInstagram className="text-2xl" />}
        </button>
        <button type="button" onClick={email} aria-label="Email" className={`${btn} bg-[#792990]`}>
          <FaEnvelope className="text-xl" />
        </button>
      </div>
      {copied && <p className="mt-3 text-sm text-gray-500" role="status">{t.copied}</p>}
    </div>
  );
};

export default BlogShare;
