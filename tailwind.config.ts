import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './demo/**/*.{ts,html}', './src/**/*.{ts,css,scss,md}'],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
