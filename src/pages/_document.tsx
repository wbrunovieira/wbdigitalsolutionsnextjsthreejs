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
          {/* Google Analytics */}
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
                gtag('config', 'G-PZ3WX1KF35', {
                  send_page_view: true
                });
                gtag('config', 'AW-802397591');
              `,
            }}
          />

          {/* Microsoft Clarity */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                })(window, document, "clarity", "script", "jteebqvfa1");
              `,
            }}
          />

          {/* Facebook Pixel */}
          <script
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

          {/* Pipedrive */}
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(ss,ex){ window.ldfdr=window.ldfdr||function(){(ldfdr._q=ldfdr._q||[]).push([].slice.call(arguments));}; (function(d,s){ var fs=d.getElementsByTagName(s)[0]; function ce(src){ var cs=d.createElement(s); cs.src=src; cs.async=1; fs.parentNode.insertBefore(cs,fs); }; ce('https://sc.lfeeder.com/lftracker_v1_'+ss+(ex?'_'+ex:'')+'.js'); })(document,'script'); })('DzLR5a5vDgJ8BoQ2');`,
            }}
          />
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
