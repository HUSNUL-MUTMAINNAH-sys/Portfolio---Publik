/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        ink: '#17151F',
        paper: '#FAFAFF',
        mist: '#F6F4FF',
        lavender: '#E9E5FF',
        muted: '#6F6B7A',
        accent: {
          DEFAULT: '#6C4FF6',
          light: '#8B7CF6',
          dark: '#5436D9',
        },
        line: '#E7E3F5',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(84,54,217,0.04), 0 8px 24px -8px rgba(84,54,217,0.10)',
        card: '0 1px 1px rgba(84,54,217,0.04), 0 24px 44px -22px rgba(84,54,217,0.24)',
        glow: '0 0 0 1px rgba(108,79,246,0.12), 0 12px 30px -10px rgba(108,79,246,0.45)',
      },
      borderRadius: {
        xl2: '1.25rem',
        xl3: '1.75rem',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-16px) rotate(1.5deg)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        drift: {
          '0%, 100%': { transform: 'translate(0,0)' },
          '33%': { transform: 'translate(30px,-20px)' },
          '66%': { transform: 'translate(-20px,20px)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        marquee: 'marquee 28s linear infinite',
        drift: 'drift 14s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
