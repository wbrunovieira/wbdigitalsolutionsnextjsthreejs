import React from 'react';
import Link from 'next/link';
import { ConsentUI } from '@/content/consentUI';
import ConsentCategory from './ConsentCategory';
import { GHOST_BUTTON, OUTLINE_BUTTON, POLICY_LINK, PRIMARY_BUTTON } from './buttonStyles';
import { Prefs } from './consentStorage';

interface ConsentPanelProps {
  t: ConsentUI;
  analytics: boolean;
  marketing: boolean;
  setAnalytics: (v: boolean) => void;
  setMarketing: (v: boolean) => void;
  onCommit: (prefs: Prefs) => void;
}

/** Expanded preference panel: one row per cookie category. */
const ConsentPanel: React.FC<ConsentPanelProps> = ({
  t, analytics, marketing, setAnalytics, setMarketing, onCommit,
}) => (
  <div className="max-h-[80vh] overflow-y-auto p-5">
    <h2 className="text-base font-bold text-white">{t.title}</h2>
    <p className="mt-1 text-xs leading-relaxed text-secondary/80">{t.intro}</p>
    <p className="mt-2 text-xs leading-relaxed text-secondary/80">
      {t.formNote}{' '}
      <Link href="/privacy-policy" className={POLICY_LINK}>
        {t.policy}
      </Link>
    </p>
    <div className="mt-3">
      <ConsentCategory t={t} category="necessary" checked locked />
      <ConsentCategory t={t} category="analytics" checked={analytics} onChange={setAnalytics} />
      <ConsentCategory t={t} category="marketing" checked={marketing} onChange={setMarketing} />
    </div>
    <div className="mt-4 flex flex-wrap justify-end gap-2">
      <button type="button" onClick={() => onCommit({ analytics: false, marketing: false })} className={GHOST_BUTTON}>
        {t.rejectAll}
      </button>
      <button type="button" onClick={() => onCommit({ analytics, marketing })} className={OUTLINE_BUTTON}>
        {t.save}
      </button>
      <button type="button" onClick={() => onCommit({ analytics: true, marketing: true })} className={PRIMARY_BUTTON}>
        {t.acceptAll}
      </button>
    </div>
  </div>
);

export default ConsentPanel;
