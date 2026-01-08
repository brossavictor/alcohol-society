/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Open Sans', 'Roboto', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        roboto: ['Roboto', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        'roboto-flex': ['Roboto Flex', 'Roboto', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
};
