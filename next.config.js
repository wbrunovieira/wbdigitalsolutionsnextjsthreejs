/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    webVitalsAttribution: ['CLS', 'LCP'],
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: `
              default-src 'self';
              connect-src 'self' https://chatbotwb.wbdigitalsolutions.com;
              script-src 'self' 'unsafe-inline' 'unsafe-eval' 
                https://connect.facebook.net 
                https://www.googletagmanager.com 
                https://sc.lfeeder.com 
                https://www.clarity.ms;
              style-src 'self' 'unsafe-inline';
              img-src 'self' https://www.facebook.com https://www.google.com https://www.clarity.ms data:;
              font-src 'self' https://fonts.gstatic.com data:;
              frame-src 'self' https://www.youtube.com;
            `.replace(/\s{2,}/g, ' ').trim()
          },
        ],
      },
    ];
  },
};

export default nextConfig;

