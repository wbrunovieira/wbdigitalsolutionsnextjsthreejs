const STORAGE_KEY = 'wb-consent-v2'; // JSON: { analytics: bool, marketing: bool, ts }
const FB_PIXEL_ID = '1261665671358254';

export type Prefs = { analytics: boolean; marketing: boolean };

interface FacebookPixel {
  (...args: unknown[]): void;
  callMethod?: (...args: unknown[]) => void;
  queue?: unknown[];
  push?: FacebookPixel;
  loaded?: boolean;
  version?: string;
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: FacebookPixel;
    _fbq?: FacebookPixel;
  }
}

function loadFacebookPixel() {
  if (typeof window === 'undefined' || window.fbq) return;
  /* eslint-disable */
  (function (f: any, b, e, v, n?: any, t?: any, s?: any) {
    if (f.fbq) return;
    n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
    if (!f._fbq) f._fbq = n;
    n.push = n; n.loaded = !0; n.version = "2.0"; n.queue = [];
    t = b.createElement(e); t.async = !0; t.src = v;
    s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
  })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
  /* eslint-enable */
  // The IIFE above defines fbq via the `any`-typed `f` alias, so TS still sees
  // window.fbq as narrowed-away by the early guard; re-widen before invoking.
  const fbq = window.fbq as FacebookPixel | undefined;
  fbq?.('init', FB_PIXEL_ID);
  fbq?.('track', 'PageView');
}

// Map granular prefs to Google Consent Mode v2 + load Pixel if marketing is on.
export function applyConsent(prefs: Prefs) {
  window.gtag?.('consent', 'update', {
    analytics_storage: prefs.analytics ? 'granted' : 'denied',
    ad_storage: prefs.marketing ? 'granted' : 'denied',
    ad_user_data: prefs.marketing ? 'granted' : 'denied',
    ad_personalization: prefs.marketing ? 'granted' : 'denied',
  });
  if (prefs.marketing) loadFacebookPixel();
}

export function save(prefs: Prefs) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...prefs, ts: Date.now() }));
  } catch {
    /* ignore */
  }
}

/** Reads the stored choice, or null when the visitor has not decided yet. */
export function readConsent(): Prefs | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Prefs) : null;
  } catch {
    return null;
  }
}
