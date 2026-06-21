// src/pages/_app.tsx
import '../styles/global.css';
import '../styles/styles.js';

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { AppProps } from 'next/app';
import Script from 'next/script';
import { LanguageProvider } from '../contexts/LanguageContext';
import { TranslationProvider } from '../contexts/TranslationContext';
import Layout from '../components/Layout';

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
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('config', GA_TRACKING_ID, { page_path: url });
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
      </TranslationProvider>
    </LanguageProvider>
  );
}

export default function App(props: AppProps) {
  return (
    <>
      {/* Google Analytics — load after page is interactive */}
      <Script
        id="ga-gtag"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        strategy="afterInteractive"
      />
      <Script
        id="ga-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', { send_page_view: true });
          `,
        }}
      />
      {/* Facebook Pixel */}
      <Script
        id="fb-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window,document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1261665671358254');
            fbq('track', 'PageView');
          `,
        }}
      />
      <MyApp {...props} />
    </>
  );
}
