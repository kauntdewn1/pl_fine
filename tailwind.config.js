/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      },
      colors: {
        background: '#dad4cd',
        accent: {
          DEFAULT: '#fe0376',
          light: '#fe357d',
          dark: '#e5026a',
        },
        gold: {
          DEFAULT: '#D4AF37',
          light: '#E5C158',
          dark: '#B39030',
        },
      },
    },
  },
  plugins: [],
};