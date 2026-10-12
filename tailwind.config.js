/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Black + royal blue theme
        'ink': {
          DEFAULT: '#050507',
          900: '#0a0a0f',
          800: '#111118',
          700: '#1a1a24',
        },
        'brand': {
          DEFAULT: '#2563eb', // royal blue
          light: '#60a5fa',   // readable blue text on black
          dark: '#1d4ed8',
        },
      },
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
      },
      keyframes: {
        blob: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(40px, -60px) scale(1.1)' },
          '66%': { transform: 'translate(-30px, 30px) scale(0.95)' },
        },
        shine: {
          '0%': { transform: 'translateX(-120%) skewX(-20deg)' },
          '100%': { transform: 'translateX(220%) skewX(-20deg)' },
        },
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
      animation: {
        blob: 'blob 12s ease-in-out infinite',
        shine: 'shine 1s ease-out',
        'gradient-x': 'gradient-x 6s ease infinite',
        blink: 'blink 1s step-end infinite',
      },
    },
  },
  plugins: [],
}
