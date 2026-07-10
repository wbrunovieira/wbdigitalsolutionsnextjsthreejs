// src/pages/_app.tsx
import '../styles/global.css';
import '../styles/styles.js';

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { AppProps } from 'next/app';
import { motion } from 'framer-motion';
import Script from 'next/script';
import { GoogleAnalytics } from '@next/third-parties/google';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { LanguageProvider } from '../contexts/LanguageContext';
import { TranslationProvider } from '../contexts/TranslationContext';
import Layout from '../components/Layout';
import CookieConsent from '../components/CookieConsent';
import Preloader from '../components/Preloader';
import { captureFirstTouch, enterPage, syncVisibility } from '@/lib/attribution';

const GA_TRACKING_ID = 'G-PZ3WX1KF35';

export const event = ({ action, category, label, value }: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  // window.gtag/window.fbq are typed by the global Window augmentation in CookieConsent.tsx.
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  // Personal CV subdomains (brunodev → /dev, brunov → /vendas) must NOT inherit
  // the main site's preloader or cookie-consent modal.
  // startsWith covers the per-locale routes (/dev/[[...lang]], /vendas/[[...lang]]).
  const isCV = router.pathname.startsWith('/dev') || router.pathname.startsWith('/vendas');

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      // SPA page views (GA respects Consent Mode; Pixel only if consented/loaded).
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'page_view', { page_path: url });
      }
      if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('track', 'PageView');
      }
      // Contact-form lead attribution: record the page journey (not on CV routes,
      // which are personal/cookieless). enterPage closes the previous page's dwell.
      if (!isCV) enterPage(url.split('?')[0]);
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => router.events.off('routeChangeComplete', handleRouteChange);
  }, [router.events, isCV]);

  // Attribution: first-touch capture + start the journey on the entry page, and
  // pause active-time while the tab is hidden. Skipped on the CV subdomains.
  useEffect(() => {
    if (isCV) return;
    captureFirstTouch();
    enterPage(window.location.pathname);
    const onVis = () => syncVisibility();
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
    // Runs once for the session entry (isCV is stable per page load); route
    // changes are handled by the routeChangeComplete effect above.
  }, []);

  // On the CV subdomains, kill the overscroll bounce and paint the root
  // background with the page's own colour — otherwise the rubber-band scroll
  // briefly reveals the main site's (dark) html/body background.
  useEffect(() => {
    if (!isCV) return;
    const el = document.documentElement;
    const prevOverscroll = el.style.overscrollBehavior;
    const prevBg = el.style.backgroundColor;
    el.style.overscrollBehavior = 'none';
    el.style.backgroundColor = router.pathname.startsWith('/vendas') ? '#f7f7f8' : '#0e0e11';
    return () => {
      el.style.overscrollBehavior = prevOverscroll;
      el.style.backgroundColor = prevBg;
    };
  }, [isCV, router.pathname]);

  return (
    <LanguageProvider>
      {/* SSR-correct messages: pages with getStaticProps ship their locale's
          messages via pageProps.i18n (see src/lib/i18n.ts). */}
      <TranslationProvider initialMessages={pageProps.i18n?.messages}>
        {!isCV && <Preloader />}
        <Layout>
          {/* Page transition — OPACITY ONLY on purpose: a transform/filter on this
              ancestor would turn the home's fixed 3D canvas into a scrolling one. */}
          <motion.div
            key={router.asPath}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <Component {...pageProps} />
          </motion.div>
        </Layout>
        {/* LGPD consent banner — inside the providers so it's localized.
            Hidden on the personal CV subdomains. */}
        {!isCV && <CookieConsent />}
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
