/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};

import withMT from '@material-tailwind/react/utils/withMT';

module.exports = withMT({
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './node_modules/alpine-tailwind-lightbox/src/template.html',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
});
