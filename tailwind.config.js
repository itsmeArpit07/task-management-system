/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: {
          dark: '#1a1a2e',
          darker: '#16213e'
        }
      }
    },
  },
  plugins: [],
};