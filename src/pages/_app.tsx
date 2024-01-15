// pages/_app.tsx
import '../styles/global.css';
import '../styles/styles.js';
import { getCLS, getFID, getLCP, getTTFB, getFCP } from 'web-vitals';
import { useEffect } from 'react';

import { AppProps } from 'next/app';
import { LanguageProvider } from '../contexts/LanguageContext';
import { TranslationProvider } from '../contexts/TranslationContext';
import Layout from '../components/Layout';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    getCLS(console.log);
    getFID(console.log);
    getLCP(console.log);
    getTTFB(console.log);
    getFCP(console.log);
  }, []);
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
