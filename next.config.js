
const nextConfig = {

    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
       
        const babelLoader = config.module.rules.find((rule) =>
          rule.use && rule.use.loader === 'next-babel-loader'
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
