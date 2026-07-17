import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

// attribution.ts is browser-only (localStorage/sessionStorage/window/document/
// navigator) and keeps module-level `current` state. We stub the browser globals
// and dynamic-import the module per test (with resetModules) so each test gets a
// fresh `current`. No jsdom needed — we only stub the specific globals it reads.

function mkStorage() {
  const m = new Map<string, string>();
  return {
    getItem: (k: string) => (m.has(k) ? (m.get(k) as string) : null),
    setItem: (k: string, v: string) => void m.set(k, String(v)),
    removeItem: (k: string) => void m.delete(k),
    clear: () => m.clear(),
  };
}

const CONSENT_KEY = 'wb-consent-v2';
const FT_KEY = 'wb-attr-ft';

let localStore: ReturnType<typeof mkStorage>;
let sessionStore: ReturnType<typeof mkStorage>;

function setBrowser(opts: { search?: string; pathname?: string; referrer?: string; ua?: string } = {}) {
  vi.stubGlobal('window', { location: { search: opts.search ?? '', pathname: opts.pathname ?? '/' } });
  vi.stubGlobal('document', { referrer: opts.referrer ?? '', visibilityState: 'visible' });
  vi.stubGlobal('navigator', { userAgent: opts.ua ?? 'Mozilla/5.0 (Macintosh)' });
}

async function load() {
  return import('../src/lib/attribution');
}

beforeEach(() => {
  vi.resetModules();
  localStore = mkStorage();
  sessionStore = mkStorage();
  vi.stubGlobal('localStorage', localStore);
  vi.stubGlobal('sessionStorage', sessionStore);
  setBrowser();
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('attribution: first-touch', () => {
  it('captures referrer, landing and UTMs on the first landing', async () => {
    setBrowser({ search: '?utm_source=google&utm_campaign=launch', pathname: '/pricing', referrer: 'https://ref.com/' });
    const { captureFirstTouch } = await load();
    captureFirstTouch();
    const ft = JSON.parse(localStore.getItem(FT_KEY) || 'null');
    expect(ft.referrer).toBe('https://ref.com/');
    expect(ft.landing).toBe('/pricing');
    expect(ft.utm).toEqual({ utm_source: 'google', utm_campaign: 'launch' });
    expect(typeof ft.ts).toBe('number');
  });

  it('does not overwrite an existing first-touch (idempotent)', async () => {
    localStore.setItem(FT_KEY, JSON.stringify({ referrer: 'first', landing: '/', utm: {}, ts: 1 }));
    setBrowser({ referrer: 'https://later.com/' });
    const { captureFirstTouch } = await load();
    captureFirstTouch();
    expect(JSON.parse(localStore.getItem(FT_KEY)!).referrer).toBe('first');
  });

  it('truncates an over-long UTM value to 120 chars', async () => {
    setBrowser({ search: `?utm_term=${'a'.repeat(300)}` });
    const { captureFirstTouch } = await load();
    captureFirstTouch();
    expect(JSON.parse(localStore.getItem(FT_KEY)!).utm.utm_term).toHaveLength(120);
  });
});

describe('attribution: getAttribution', () => {
  it('detects device from the user agent', async () => {
    setBrowser({ ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS)' });
    let { getAttribution } = await load();
    expect(getAttribution().device).toBe('mobile');

    vi.resetModules();
    setBrowser({ ua: 'Mozilla/5.0 (Macintosh; Intel Mac OS X)' });
    ({ getAttribution } = await load());
    expect(getAttribution().device).toBe('desktop');
  });

  it('omits the journey when analytics consent is not granted', async () => {
    const { enterPage, getAttribution } = await load();
    enterPage('/home');
    const a = getAttribution();
    expect(a.consented).toBe(false);
    expect(a.journey).toEqual([]);
  });

  it('records the page journey when consent is granted', async () => {
    localStore.setItem(CONSENT_KEY, JSON.stringify({ analytics: true }));
    const { enterPage, getAttribution } = await load();
    enterPage('/home');
    enterPage('/pricing'); // commits /home into the stored journey
    const a = getAttribution();
    expect(a.consented).toBe(true);
    expect(a.journey.map((h) => h.p)).toEqual(['/home', '/pricing']);
  });

  it('reflects the stored first-touch in the snapshot', async () => {
    localStore.setItem(FT_KEY, JSON.stringify({ referrer: 'https://x.com/', landing: '/l', utm: {}, ts: 9 }));
    const { getAttribution } = await load();
    expect(getAttribution().firstTouch?.referrer).toBe('https://x.com/');
  });
});
