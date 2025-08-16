import Document, { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="pt-BR">
        <Head>
          {/* Google Analytics - Load early for better tracking */}
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-PZ3WX1KF35"
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                // Initial configuration - page tracking now handled by PageHead component
                gtag('config', 'G-PZ3WX1KF35', {
                  send_page_view: true // Enable automatic page view tracking
                });
                gtag('config', 'AW-802397591');
              `,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;