// pages/_app.tsx
import { AppProps } from 'next/app';
import { LanguageProvider } from '../contexts/LanguageContext';
import { TranslationProvider } from '../contexts/TranslationContext';
import Layout from '../components/Layout'; // Importe o Layout

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
