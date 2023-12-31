// pages/_app.tsx
import { AppProps } from 'next/app';
import { LanguageProvider } from '../contexts/LanguageContext';
import { TranslationProvider } from '../contexts/TranslationContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <LanguageProvider>
    <TranslationProvider>
      <Component {...pageProps} />
    </TranslationProvider>
  </LanguageProvider>
  );
}

export default MyApp;
