import Document, { Html, Head, Main, NextScript, DocumentContext, DocumentInitialProps } from 'next/document';

interface MyDocumentProps extends DocumentInitialProps {
  lang: string;
}

class MyDocument extends Document<MyDocumentProps> {
  static async getInitialProps(ctx: DocumentContext): Promise<MyDocumentProps> {
    const initialProps = await Document.getInitialProps(ctx);
    const acceptLanguage = ctx.req?.headers?.['accept-language'] ?? '';
    const primary = acceptLanguage.split(',')[0].split(';')[0].trim().toLowerCase();

    let lang = 'en';
    if (primary.startsWith('pt')) lang = 'pt-BR';
    else if (primary.startsWith('es')) lang = 'es';
    else if (primary.startsWith('it')) lang = 'it';

    return { ...initialProps, lang };
  }

  render() {
    const { lang } = this.props;
    return (
      <Html lang={lang}>
        <Head>
          {/* Preconnect to critical third-party origins */}
          <link rel="preconnect" href="https://www.googletagmanager.com" />
          <link rel="preconnect" href="https://www.google-analytics.com" />
          <link rel="preconnect" href="https://scripts.clarity.ms" />
          <link rel="preconnect" href="https://connect.facebook.net" crossOrigin="anonymous" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link rel="dns-prefetch" href="https://googleads.g.doubleclick.net" />
          <link rel="dns-prefetch" href="https://www.google.com" />

        </Head>
        <body>
          <Main />
          <NextScript />
          <noscript>
            <img
              height="1"
              width="1"
              src="https://www.facebook.com/tr?id=1261665671358254&ev=PageView&noscript=1"
              alt="facebook pixel"
            />
          </noscript>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
