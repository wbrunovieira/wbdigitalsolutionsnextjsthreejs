'use client';

import { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { consentUI } from '@/content/consentUI';
import ConsentBanner from './consent/ConsentBanner';
import ConsentPanel from './consent/ConsentPanel';
import { applyConsent, Prefs, readConsent, save } from './consent/consentStorage';

const CookieConsent: React.FC = () => {
  const { language } = useLanguage();
  const lang = language === 'pt' ? 'pt-BR' : language;
  const t = consentUI[lang] ?? consentUI['pt-BR'];

  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  // Default OFF so the deliberate "Customize → Save" path is opt-in, not a
  // pre-ticked opt-out (LGPD art. 8 §4). "Accept all" still grants everything;
  // re-opening via "Manage cookies" seeds these from the stored choice.
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const stored = readConsent();
    if (stored) {
      applyConsent(stored);
    } else {
      setVisible(true);
    }
  }, []);

  // Re-open the banner on demand (footer "Manage cookies" link) so consent can
  // be reviewed and withdrawn as easily as it was given (LGPD art. 8 §5). The
  // toggles are seeded from the stored choice so they show the live state.
  useEffect(() => {
    const open = () => {
      const stored = readConsent();
      if (stored) {
        setAnalytics(!!stored.analytics);
        setMarketing(!!stored.marketing);
      }
      setExpanded(true);
      setVisible(true);
    };
    window.addEventListener('wb-open-consent', open);
    return () => window.removeEventListener('wb-open-consent', open);
  }, []);

  const commit = (prefs: Prefs) => {
    save(prefs);
    applyConsent(prefs);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] p-3 sm:p-4">
      <div className="mx-auto max-w-2xl rounded-2xl border border-white/10 bg-[#1a0826] shadow-2xl backdrop-blur-md">
        {expanded ? (
          <ConsentPanel
            t={t}
            analytics={analytics}
            marketing={marketing}
            setAnalytics={setAnalytics}
            setMarketing={setMarketing}
            onCommit={commit}
          />
        ) : (
          <ConsentBanner t={t} onCustomize={() => setExpanded(true)} onCommit={commit} />
        )}
      </div>
    </div>
  );
};

export default CookieConsent;
