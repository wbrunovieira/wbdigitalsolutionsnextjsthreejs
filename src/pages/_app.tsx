// src/pages/_app.tsx
import '../styles/global.css';
import '../styles/styles.js';

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { AppProps } from 'next/app';
import Script from 'next/script';
import { GoogleAnalytics } from '@next/third-parties/google';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { LanguageProvider } from '../contexts/LanguageContext';
import { TranslationProvider } from '../contexts/TranslationContext';
import Layout from '../components/Layout';
import CookieConsent from '../components/CookieConsent';

const GA_TRACKING_ID = 'G-PZ3WX1KF35';

export const event = ({ action, category, label, value }: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      // SPA page views (GA respects Consent Mode; Pixel only if consented/loaded).
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'page_view', { page_path: url });
      }
      if (typeof window !== 'undefined' && (window as any).fbq) {
        (window as any).fbq('track', 'PageView');
      }
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => router.events.off('routeChangeComplete', handleRouteChange);
  }, [router.events]);

  return (
    <LanguageProvider>
      <TranslationProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        {/* LGPD consent banner — inside the providers so it's localized */}
        <CookieConsent />
      </TranslationProvider>
    </LanguageProvider>
  );
}

export default function App(props: AppProps) {
  return (
    <>
      {/* Google Consent Mode v2 — defaults set BEFORE any tag loads. Everything
          ad/analytics related starts DENIED (no cookies); the consent banner
          flips it to granted on accept. A prior "granted" choice is restored. */}
      <Script
        id="consent-default"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'default', {
              ad_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied',
              analytics_storage: 'denied',
              functionality_storage: 'granted',
              security_storage: 'granted',
              wait_for_update: 500
            });
            gtag('set', 'url_passthrough', true);
            gtag('set', 'ads_data_redaction', true);
            try {
              if (localStorage.getItem('wb-consent') === 'granted') {
                gtag('consent', 'update', {
                  ad_storage: 'granted',
                  ad_user_data: 'granted',
                  ad_personalization: 'granted',
                  analytics_storage: 'granted'
                });
              }
            } catch (e) {}
          `,
        }}
      />

      {/* GA4 via the official Next library (loads gtag.js, respects Consent Mode) */}
      <GoogleAnalytics gaId={GA_TRACKING_ID} />

      <MyApp {...props} />

      {/* Vercel — cookieless, privacy-first metrics (no consent needed) */}
      <Analytics />
      <SpeedInsights />
    </>
  );
}
