/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: '#0F1B2B', 2: '#16263B' },
        ink: '#1A2430',
        slate: { DEFAULT: '#5B6676', light: '#8B93A1' },
        cloud: '#F4F6F9',
        line: '#E4E8EE',
        amber: { DEFAULT: '#E8732A', dark: '#C45F1E', pale: '#FDECE0' },
      },
      fontFamily: {
        head: ['Manrope', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        riseIn: { from: { opacity: 0, transform: 'translateY(16px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
      },
      animation: { rise: 'riseIn .65s cubic-bezier(.2,.7,.2,1) both' },
    },
  },
  plugins: [],
}
