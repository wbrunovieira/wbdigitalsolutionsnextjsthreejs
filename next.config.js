const nextConfig = {
  experimental: {
    webVitalsAttribution: ['CLS', 'LCP'],
  },

  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap.xml',
      },
    ];
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
              connect-src 'self' 
                http://localhost:8000
                http://45.90.123.190:8000
                https://chatbotwb.wbdigitalsolutions.com
                https://www.google-analytics.com
                https://www.googleadservices.com
                https://www.google.com
                https://www.gstatic.com
                https://fonts.gstatic.com
                https://fonts.googleapis.com
                https://region1.google-analytics.com
                https://tr-rc.lfeeder.com
                https://c.clarity.ms
                https://e.clarity.ms
                https://o.clarity.ms
                https://www.facebook.com
                https://cdn.jsdelivr.net
                data:;
              script-src 'self' 'unsafe-inline' 'unsafe-eval' blob:
                https://connect.facebook.net 
                https://www.googletagmanager.com 
                https://www.google-analytics.com
                https://googleads.g.doubleclick.net
                https://www.googleadservices.com
                https://sc.lfeeder.com 
                https://www.clarity.ms
                https://scripts.clarity.ms
                https://www.gstatic.com;
              worker-src 'self' blob:;
              style-src 'self' 'unsafe-inline';
              img-src 'self' 
                https://www.facebook.com 
                https://www.google.com 
                https://www.google-analytics.com
                https://www.googleadservices.com
                https://googleads.g.doubleclick.net
                https://www.clarity.ms 
                https://tr-rc.lfeeder.com
                https://c.clarity.ms
                https://www.wbdigitalsolutions.com
                https://tr.lfeeder.com
                https://www.google.com.br
                data:;
              font-src 'self' https://fonts.gstatic.com https://fonts.googleapis.com data:;
              frame-src 'self' 
                https://www.youtube.com
                https://www.googletagmanager.com
                https://cdn.lightwidget.com
                https://lightwidget.com
                https://td.doubleclick.net;
            `.replace(/\s{2,}/g, ' ').trim()
          },
        ],
      },
    ];
  },

  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Handle nodemailer import warnings
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        dns: false,
        child_process: false,
      };
    }

    // Ignore nodemailer warnings in build
    config.externals = config.externals || [];
    if (isServer) {
      config.externals.push('nodemailer');
    }

    const babelLoader = config.module.rules.find(
      (rule) => rule.use && rule.use.loader === 'next-babel-loader'
    );

    if (babelLoader) {
      babelLoader.use.options.presets = [
        [
          'next/babel',
          {
            'preset-react': {
              runtime: 'automatic',
              importSource: '@react',
            },
            'preset-env': {
              modules: 'commonjs',
            },
          },
        ],
      ];
    }

    return config;
  },
};

export default nextConfig;
