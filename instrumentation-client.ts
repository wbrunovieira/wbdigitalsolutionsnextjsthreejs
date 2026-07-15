import * as Sentry from '@sentry/nextjs';

// Inert until NEXT_PUBLIC_SENTRY_DSN is set (create a free Sentry project, then add
// the DSN as a Vercel env var). LGPD-safe: no PII, no session replay (replay could
// record what users type — including PII).
Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  sendDefaultPii: false,
  tracesSampleRate: process.env.NODE_ENV === 'development' ? 1.0 : 0.1,
});

// Instrument client-side route transitions for tracing.
export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
