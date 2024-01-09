import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',

    './src/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        'custom-purple': '#792990',

        primary: '#350545',
        secondary: '#aaa6c3',
        yellow: '#ffb947',

        
       
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        mono: ['Ubuntu Mono', 'monospace'],
      },

      boxShadow: {
        card: '0px 35px 120px -15px #211e35',
      },
      screens: {
        xs: '450px',
      },
      backgroundImage: {
        'custom-gradient': `radial-gradient(
          circle at top center,
          hsla(286, 55%, 36%, 0.5) 0%,
          hsla(222, 0%, 0%, 0) 50%,
          hsla(222, 0%, 0%, 0) 100%
        )`,
        'home-section': 'url(\'/svg/bghome.svg\')',
      },
      
    },
  },
  plugins: [],
};
export default config;
