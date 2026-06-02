/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        god: {
          bg: '#0f0d0b',
          card: '#1a1713',
          border: '#3a3530',
          gold: '#c9a84c',
          muted: '#9ca3af',
          whatsapp: '#25D366',
        },
      },
      fontFamily: {
        heading: ['Bebas Neue', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
      },
      boxShadow: {
        gold: '0 18px 60px rgba(201, 168, 76, 0.16)',
        dark: '0 22px 80px rgba(0, 0, 0, 0.42)',
      },
    },
  },
  plugins: [],
};
