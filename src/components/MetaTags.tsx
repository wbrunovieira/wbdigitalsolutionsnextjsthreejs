
"use client";

import { useTranslations } from "@/contexts/TranslationContext";
import Head from "next/head";


const Metatags = () => {
  const t = useTranslations();

  return (
    <Head>

      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta
        httpEquiv="Content-Security-Policy"
        content="default-src 'self'; connect-src 'self' https:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://connect.facebook.net https://www.googletagmanager.com https://sc.lfeeder.com https://googleads.g.doubleclick.net https://www.google-analytics.com https://www.googleadservices.com https://cdn.lightwidget.com https://www.clarity.ms https://www.google.com https://t.clarity.ms https://www.google.com.br; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' https://www.facebook.com https://www.wbdigitalsolutions.com https://tr.lfeeder.com https://googleads.g.doubleclick.net https://www.google.com https://c.clarity.ms https://www.google.com.br; font-src 'self' https://fonts.gstatic.com data:; frame-src 'self' https://www.youtube.com https://cdn.lightwidget.com https://lightwidget.com https://td.doubleclick.net;"
      />


      <meta name="robots" content="index, follow" />


      <meta property="og:type" content="website" />
      <meta property="og:title" content={t.metaOgTitle} />
      <meta name="description" content={t.metaDescription} />

      <meta property="og:url" content="https://www.wbdigitalsolutions.com/" />
      <meta
        property="og:image"
        content="https://www.wbdigitalsolutions.com/svg/logo.svg"
      />

      <meta name="keywords" content={t.metaKeywords} />
      <meta name="author" content="Bruno Vieira" />
      <meta name="copyright" content="WB Digital Solutions" />


      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@seuusername" />
      <meta name="twitter:title" content={t.metaTwitterTitle} />
      <meta name="twitter:description" content={t.metaTwitterDescription} />
      <meta
        name="twitter:image"
        content="https://www.wbdigitalsolutions.com/svg/logo.svg"
      />

      {/* Link canonical e preload */}
      <link rel="canonical" href="https://www.wbdigitalsolutions.com/" />
      <link
        rel="preload"
        as="image"
        href="https://www.wbdigitalsolutions.com/svg/logo.svg"
      />

      {/* Título e favicon */}
      <title>{t.metaTitle}</title>
      <link rel="icon" href="assets/favicon.png" />

      {/* Pipedrive Tag */}
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(ss,ex){ window.ldfdr=window.ldfdr||function(){(ldfdr._q=ldfdr._q||[]).push([].slice.call(arguments));}; (function(d,s){ var fs=d.getElementsByTagName(s)[0]; function ce(src){ var cs=d.createElement(s); cs.src=src; cs.async=1; fs.parentNode.insertBefore(cs,fs); }; ce('https://sc.lfeeder.com/lftracker_v1_'+ss+(ex?'_'+ex:'')+'.js'); })(document,'script'); })('DzLR5a5vDgJ8BoQ2');`,
        }}
      />

      {/* Facebook Pixel Code */}
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
      <noscript>
        <img
          height="1"
          width="1"
          src="https://www.facebook.com/tr?id=1261665671358254&ev=PageView&noscript=1"
          alt="facebook pixel"
        />
      </noscript>

      {/* Google Tag (gtag.js) */}
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-PZ3WX1KF35"></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-PZ3WX1KF35');
            gtag('config', 'AW-802397591');
            gtag('event', 'conversion', {'send_to': 'AW-802397591/sPHGCN3A2osYEJe7zv4C'});
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
    </Head>
  );
};

export default Metatags;