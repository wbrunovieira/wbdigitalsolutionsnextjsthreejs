import React from 'react';
import Link from 'next/link';
import { ConsentUI } from '@/content/consentUI';
import { GHOST_BUTTON, POLICY_LINK, PRIMARY_BUTTON } from './buttonStyles';
import { Prefs } from './consentStorage';

interface ConsentBannerProps {
  t: ConsentUI;
  onCustomize: () => void;
  onCommit: (prefs: Prefs) => void;
}

/** Collapsed first-visit bar: accept, reject or open the preference panel. */
const ConsentBanner: React.FC<ConsentBannerProps> = ({ t, onCustomize, onCommit }) => (
  <div className="p-4 sm:p-5 md:flex md:items-center md:gap-4">
    <p className="mb-3 text-sm leading-relaxed text-secondary md:mb-0 md:flex-1">
      {t.bannerText}{' '}
      <Link href="/privacy-policy" className={POLICY_LINK}>
        {t.policy}
      </Link>
    </p>
    <div className="flex shrink-0 flex-wrap gap-2">
      <button type="button" onClick={onCustomize} className={GHOST_BUTTON}>
        {t.customize}
      </button>
      <button type="button" onClick={() => onCommit({ analytics: false, marketing: false })} className={GHOST_BUTTON}>
        {t.rejectAll}
      </button>
      <button type="button" onClick={() => onCommit({ analytics: true, marketing: true })} className={PRIMARY_BUTTON}>
        {t.acceptAll}
      </button>
    </div>
  </div>
);

export default ConsentBanner;
