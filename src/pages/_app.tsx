// src/pages/_app.tsx
import '../styles/global.css';
import '../styles/styles.js';

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { AppProps } from 'next/app';
import { LanguageProvider } from '../contexts/LanguageContext';
import { TranslationProvider } from '../contexts/TranslationContext';
import Layout from '../components/Layout';

// Google Analytics tracking
const GA_TRACKING_ID = 'G-PZ3WX1KF35';

// Function to track page views
const pageview = (url: string) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    console.log('[GA Debug] Sending pageview:', {
      tracking_id: GA_TRACKING_ID,
      page_path: url,
      gtag_exists: !!(window as any).gtag,
      dataLayer_length: (window as any).dataLayer?.length || 0
    });
    
    (window as any).gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  } else {
    console.warn('[GA Debug] gtag not available', {
      window_exists: typeof window !== 'undefined',
      gtag_exists: typeof window !== 'undefined' && !!(window as any).gtag
    });
  }
};

// Function to track events
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
    // Track page views on route change
    const handleRouteChange = (url: string) => {
      // Track for Facebook Pixel
      if (typeof window !== 'undefined' && (window as any).fbq) {
        (window as any).fbq('track', 'PageView');
      }
    };

    // Listen to route changes
    router.events.on('routeChangeComplete', handleRouteChange);
    router.events.on('routeChangeError', (err, url) => {
      console.error('[GA] Failed to track page:', url, err);
    });

    // Clean up
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
      router.events.off('routeChangeError', () => {});
    };
  }, [router.events]);

  return (
    <LanguageProvider>
      <TranslationProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </TranslationProvider>
    </LanguageProvider>
  );
}

export default MyApp;
