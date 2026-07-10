'use client';

/**
 * Lead-source attribution for the contact form (client-only).
 *
 * - First-touch (referrer, landing page, UTMs): captured once, kept in
 *   localStorage across sessions. Treated as functional — it is about the
 *   inquiry's own origin, not cross-site tracking.
 * - Session journey (every page + ACTIVE seconds per page): sessionStorage,
 *   recorded ONLY when analytics consent is granted (it is analytics-grade).
 *   Active time pauses while the tab is hidden (visibilitychange), so a
 *   backgrounded tab doesn't inflate the numbers.
 *
 * Wired from _app.tsx: captureFirstTouch() + enterPage() on load, enterPage()
 * on each route change, syncVisibility() on visibilitychange. Contact.tsx reads
 * getAttribution() at submit.
 */

const FT_KEY = 'wb-attr-ft';
const JOURNEY_KEY = 'wb-attr-journey';
const CONSENT_KEY = 'wb-consent-v2';
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'] as const;
const MAX_HOPS = 30;

type Utm = Partial<Record<(typeof UTM_KEYS)[number], string>>;
export type FirstTouch = { referrer: string; landing: string; utm: Utm; ts: number };
export type Hop = { p: string; s: number };
export type Attribution = {
  firstTouch: FirstTouch | null;
  journey: Hop[];
  currentPage: string;
  device: 'mobile' | 'desktop';
  consented: boolean;
};

function analyticsConsent(): boolean {
  try {
    const c = JSON.parse(localStorage.getItem(CONSENT_KEY) || 'null');
    return !!(c && c.analytics);
  } catch {
    return false;
  }
}

function readFirstTouch(): FirstTouch | null {
  try {
    return JSON.parse(localStorage.getItem(FT_KEY) || 'null');
  } catch {
    return null;
  }
}

/** One-time first-touch capture on the first landing of a browser. */
export function captureFirstTouch(): void {
  try {
    if (localStorage.getItem(FT_KEY)) return;
    const params = new URLSearchParams(window.location.search);
    const utm: Utm = {};
    for (const k of UTM_KEYS) {
      const v = params.get(k);
      if (v) utm[k] = v.slice(0, 120);
    }
    const ft: FirstTouch = { referrer: document.referrer || '', landing: window.location.pathname, utm, ts: Date.now() };
    localStorage.setItem(FT_KEY, JSON.stringify(ft));
  } catch {
    /* storage unavailable (private mode) */
  }
}

// --- session journey (active time per page) ---
let current: { path: string; startedAt: number; active: number; visible: boolean } | null = null;

function readJourney(): Hop[] {
  try {
    return JSON.parse(sessionStorage.getItem(JOURNEY_KEY) || '[]');
  } catch {
    return [];
  }
}

function writeJourney(journey: Hop[]): void {
  try {
    sessionStorage.setItem(JOURNEY_KEY, JSON.stringify(journey.slice(-MAX_HOPS)));
  } catch {
    /* ignore */
  }
}

function activeSeconds(): number {
  if (!current) return 0;
  const live = current.visible ? Date.now() - current.startedAt : 0;
  return Math.round((current.active + live) / 1000);
}

/** Fold `current` into the stored journey (merging a repeated path). */
function commitCurrent(): void {
  if (!current) return;
  if (analyticsConsent()) appendHop(readJourney(), current.path, activeSeconds(), true);
  current = null;
}

function appendHop(journey: Hop[], path: string, secs: number, persist: boolean): Hop[] {
  const last = journey[journey.length - 1];
  if (last && last.p === path) last.s += secs;
  else journey.push({ p: path, s: secs });
  if (persist) writeJourney(journey);
  return journey;
}

/** Call on the initial load and on every client route change. */
export function enterPage(path: string): void {
  commitCurrent();
  current = { path, startedAt: Date.now(), active: 0, visible: document.visibilityState === 'visible' };
}

/** Call from a visibilitychange listener so active time pauses in the background. */
export function syncVisibility(): void {
  if (!current) return;
  if (document.visibilityState === 'hidden' && current.visible) {
    current.active += Date.now() - current.startedAt;
    current.visible = false;
  } else if (document.visibilityState === 'visible' && !current.visible) {
    current.startedAt = Date.now();
    current.visible = true;
  }
}

/** Snapshot for form submit — includes the in-progress page, mutates nothing. */
export function getAttribution(): Attribution {
  const consented = analyticsConsent();
  const journey = consented ? [...readJourney()] : [];
  if (consented && current) appendHop(journey, current.path, activeSeconds(), false);
  return {
    firstTouch: readFirstTouch(),
    journey,
    currentPage: typeof window !== 'undefined' ? window.location.pathname : '',
    device: /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent) ? 'mobile' : 'desktop',
    consented,
  };
}
