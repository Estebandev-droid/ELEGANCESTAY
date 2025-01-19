/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        pink: {
          light: 'rgba(255, 56, 92, 0.8)',
          DEFAULT: 'rgba(255, 56, 92, 1)',
        },
        lightGray: '#f5f5f5',
        header: '#f5f5f5',
        white: '#ffffff',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

