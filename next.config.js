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
            value:
              "default-src 'self'; connect-src 'self' http://192.168.0.9:8000 ws://192.168.0.9:3000; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline';",
          },
        ],
      },
    ];
  },
};

export default nextConfig;


// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   experimental: {
//     webVitalsAttribution: ['CLS', 'LCP'],
//   },

//   webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
//     const babelLoader = config.module.rules.find(
//       (rule) => rule.use && rule.use.loader === 'next-babel-loader'
//     );

//     if (babelLoader) {
//       babelLoader.use.options.presets = [
//         [
//           'next/babel',
//           {
//             'preset-react': {
//               runtime: 'automatic',
//               importSource: '@react',
//             },
//             'preset-env': {
//               modules: 'commonjs',
//             },
//           },
//         ],
//       ];
//     }

//     return config;
//   },

//   async headers() {
//     return [
//       {
//         source: "/(.*)",
//         headers: [
//           {
//             key: "Content-Security-Policy",
//             value:
//               "default-src 'self'; connect-src 'self' http://192.168.0.9:8000; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline';",
//           },
//         ],
//       },
//     ];
//   },
// };

// export default nextConfig;