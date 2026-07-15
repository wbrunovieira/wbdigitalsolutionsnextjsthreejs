import { withSentryConfig } from '@sentry/nextjs';

const nextConfig = {
  // Disable the dev "static route indicator". Its HMR `isrManifest` message
  // crashes the Next 15.5 dev client (handleStaticIndicator → "Cannot read
  // properties of undefined (reading 'components')"), causing an infinite
  // Fast Refresh full-reload loop. Off = no message = no loop.
  devIndicators: false,

  experimental: {
    webVitalsAttribution: ['CLS', 'LCP'],
  },

  // URL-locale i18n (see docs/i18n-migration-plan.md): root = en (continuity
  // with what search engines already indexed), /pt /it /es are additive.
  // localeDetection off per Google guidance (no Accept-Language redirects);
  // the language switcher navigates instead. NOTE: with i18n enabled,
  // `locale: false` rules match the INTERNAL locale-prefixed path: public
  // '/x' arrives as '/en/x' (default locale gets prefixed internally) and
  // '/pt/x' stays '/pt/x'. Sources below are written in that internal form.
  i18n: {
    locales: ['en', 'pt', 'it', 'es'],
    defaultLocale: 'en',
    localeDetection: false,
  },

  async redirects() {
    return [
      {
        source: '/:path*',
        locale: false,
        has: [{ type: 'host', value: 'wbdigitalsolutions.com' }],
        destination: 'https://www.wbdigitalsolutions.com/:path*',
        permanent: true,
      },
      // Old-sitemap /pt-BR URLs finally get a real destination: the new /pt
      // locale routes (/es and /it old URLs now ARE live locale routes, so
      // their kill-redirects are gone). Scoped to www like before.
      {
        source: '/en/pt-BR',
        locale: false,
        has: [{ type: 'host', value: 'www.wbdigitalsolutions.com' }],
        destination: '/pt',
        permanent: true,
      },
      {
        source: '/en/pt-BR/:path*',
        locale: false,
        has: [{ type: 'host', value: 'www.wbdigitalsolutions.com' }],
        destination: '/pt/:path*',
        permanent: true,
      },
      // Hygiene: built-in i18n also mints locale-prefixed variants of the CV
      // routes; collapse them to the unprefixed pages (their canonicals live
      // on the personal subdomains).
      {
        source: '/:l(pt|it|es)/dev/:path*',
        locale: false,
        destination: '/dev/:path*',
        permanent: true,
      },
      {
        source: '/:l(pt|it|es)/dev',
        locale: false,
        destination: '/dev',
        permanent: true,
      },
      {
        source: '/:l(pt|it|es)/vendas/:path*',
        locale: false,
        destination: '/vendas/:path*',
        permanent: true,
      },
      {
        source: '/:l(pt|it|es)/vendas',
        locale: false,
        destination: '/vendas',
        permanent: true,
      },
      // Old static files from the previous site.
      { source: '/en/index.html', locale: false, destination: '/', permanent: true },
      { source: '/en/site.html', locale: false, destination: '/', permanent: true },
    ];
  },

  async rewrites() {
    return {
      // beforeFiles runs before filesystem/page resolution — required so each
      // personal-CV subdomain root maps to its page even though pages/index.tsx
      // exists. brunodev → technical (/dev), brunov → sales (/vendas).
      // i18n GOTCHA (took production down once): with the i18n block enabled,
      // `locale: false` sources are matched against the INTERNAL locale-
      // prefixed path — the public "/" arrives as "/en", "/pt" stays "/pt",
      // and destinations must be locale-prefixed too. Every source below
      // therefore carries the locale segment explicitly.
      beforeFiles: [
        {
          source: '/en',
          locale: false,
          has: [{ type: 'host', value: 'brunodev.wbdigitalsolutions.com' }],
          destination: '/en/dev',
        },
        {
          source: '/en',
          locale: false,
          has: [{ type: 'host', value: 'brunov.wbdigitalsolutions.com' }],
          destination: '/en/vendas',
        },
        // Locale routes on the CV subdomains map to the pages' own
        // [[...lang]] catch-alls under the default site locale.
        {
          source: '/:lang(pt|it|es)',
          locale: false,
          has: [{ type: 'host', value: 'brunodev.wbdigitalsolutions.com' }],
          destination: '/en/dev/:lang',
        },
        {
          source: '/:lang(pt|it|es)',
          locale: false,
          has: [{ type: 'host', value: 'brunov.wbdigitalsolutions.com' }],
          destination: '/en/vendas/:lang',
        },
        // brunov's English slug (public /en): with the default locale
        // unprefixed, the public "/en" path arrives internally as "/en/en".
        {
          source: '/en/en',
          locale: false,
          has: [{ type: 'host', value: 'brunov.wbdigitalsolutions.com' }],
          destination: '/en/vendas/en',
        },
        // Per-host llms.txt (LLM-friendly site summary): each CV subdomain
        // serves its own profile; the main domain falls through to public/llms.txt.
        {
          source: '/en/llms.txt',
          locale: false,
          has: [{ type: 'host', value: 'brunodev.wbdigitalsolutions.com' }],
          destination: '/llms-brunodev.txt',
        },
        {
          source: '/en/llms.txt',
          locale: false,
          has: [{ type: 'host', value: 'brunov.wbdigitalsolutions.com' }],
          destination: '/llms-brunov.txt',
        },
        // Per-host sitemap + robots for the CV subdomains (the sitemap
        // protocol is same-host only, and the shared robots.txt advertised
        // the WB sitemap). The www host falls through to /api/sitemap.xml.
        {
          source: '/en/sitemap.xml',
          locale: false,
          has: [{ type: 'host', value: 'brunodev.wbdigitalsolutions.com' }],
          destination: '/sitemap-brunodev.xml',
        },
        {
          source: '/en/sitemap.xml',
          locale: false,
          has: [{ type: 'host', value: 'brunov.wbdigitalsolutions.com' }],
          destination: '/sitemap-brunov.xml',
        },
        {
          source: '/en/robots.txt',
          locale: false,
          has: [{ type: 'host', value: 'brunodev.wbdigitalsolutions.com' }],
          destination: '/robots-brunodev.txt',
        },
        {
          source: '/en/robots.txt',
          locale: false,
          has: [{ type: 'host', value: 'brunov.wbdigitalsolutions.com' }],
          destination: '/robots-brunov.txt',
        },
      ],
      afterFiles: [
        {
          source: '/en/sitemap.xml',
          locale: false,
          destination: '/api/sitemap.xml',
        },
      ],
    };
  },

  async headers() {
    return [
      // Long-term cache for immutable 3D models and textures
      {
        source: '/models/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      // Long-term cache for static images
      {
        source: '/img/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      // NOTE: the security headers (CSP, X-Frame-Options, X-Content-Type-Options,
      // Referrer-Policy, Permissions-Policy) now live in vercel.json as the single
      // source of truth. next.config headers() were NOT reaching statically
      // prerendered pages served from Vercel's edge cache (x-vercel-cache: HIT),
      // so real users loaded pages without them; vercel.json applies at the edge to
      // every response. Keep only Cache-Control rules here.
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

// Only apply Sentry's build instrumentation when a DSN is configured, so the build
// is completely unaffected until Sentry is turned on (env var set on Vercel).
export default process.env.NEXT_PUBLIC_SENTRY_DSN
  ? withSentryConfig(nextConfig, {
      org: process.env.SENTRY_ORG,
      project: process.env.SENTRY_PROJECT,
      silent: !process.env.CI,
    })
  : nextConfig;
