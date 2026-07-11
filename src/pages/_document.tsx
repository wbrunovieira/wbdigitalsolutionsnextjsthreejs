import Document, { Html, Head, Main, NextScript, DocumentContext, DocumentInitialProps } from 'next/document';
import { toAppLang } from '@/lib/i18n';

interface MyDocumentProps extends DocumentInitialProps {
  lang: string;
}

class MyDocument extends Document<MyDocumentProps> {
  static async getInitialProps(ctx: DocumentContext): Promise<MyDocumentProps> {
    const initialProps = await Document.getInitialProps(ctx);
    // URL-driven i18n: the html lang mirrors the route locale (mapped to the
    // proper BCP 47 value, e.g. /pt -> pt-BR). Accept-Language detection is
    // gone with the single-URL model.
    return { ...initialProps, lang: toAppLang(ctx.locale) };
  }

  render() {
    const { lang } = this.props;
    return (
      <Html lang={lang}>
        <Head>
          {/* Preconnect to critical third-party origins */}
          <link rel="preconnect" href="https://www.googletagmanager.com" />
          <link rel="preconnect" href="https://www.google-analytics.com" />
          <link rel="preconnect" href="https://connect.facebook.net" crossOrigin="anonymous" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        </Head>
        <body>
          <Main />
          <NextScript />
          {/* Meta Pixel loads only via CookieConsent.tsx after marketing consent.
              The former noscript <img> beacon was removed: it fired a PageView to
              Meta on every load regardless of consent, bypassing the banner. */}
        </body>
      </Html>
    );
  }
}

export default MyDocument;
