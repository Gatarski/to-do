import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      mobile: { raw: '(max-height: 639px),(max-width: 639px)' },
      // this is used when app is on mobile phone on horizontal or vertical view
    },
  },
  plugins: [],
};
export default config;
