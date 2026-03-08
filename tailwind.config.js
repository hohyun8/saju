/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          900: '#0d0d2b',
          800: '#1a1a3e',
          700: '#242455',
          600: '#2e2e6e',
        },
        gold: {
          400: '#FFE066',
          500: '#FFD700',
          600: '#E6C200',
        },
        crimson: '#C0392B',
      },
      fontFamily: {
        serif: ['"Noto Serif KR"', 'serif'],
        sans: ['"Noto Sans KR"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
