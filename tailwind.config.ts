import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',

    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'custom-purple': '#792990',

        primary: '#350545',
        secondary: '#aaa6c3',
        yellowcustom: '#ffb947',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        mono: ['Ubuntu Mono', 'monospace'],
      },

      backgroundImage: {
        'custom-gradient': `radial-gradient(
          circle at top center,
          hsla(286, 55%, 36%, 0.5) 0%,
          hsla(222, 0%, 0%, 0) 50%,
          hsla(222, 0%, 0%, 0) 100%
        )`,
      },
    },
  },
  plugins: [],
};
export default config;
