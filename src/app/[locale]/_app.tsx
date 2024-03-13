// pages/_app.tsx
import '../styles/global.css';
import '../../styles/styles.js';

import { AppProps } from 'next/app';

import Layout from '../../components/Layout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
