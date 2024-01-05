// pages/_app.tsx
import '../styles/global.css';
import '../styles/styles.js';

import { AppProps } from 'next/app';
import { LanguageProvider } from '../contexts/LanguageContext';
import { TranslationProvider } from '../contexts/TranslationContext';
import Layout from '../components/Layout'; 

function MyApp({ Component, pageProps }: AppProps) {

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
