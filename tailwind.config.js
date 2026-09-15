/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './app/**/*.{vue,js,ts,jsx,tsx}',
    './components/**/*.{vue,js,ts,jsx,tsx}',
    './layouts/**/*.{vue,js,ts,jsx,tsx}',
    './pages/**/*.{vue,js,ts,jsx,tsx}',
    './plugins/**/*.{vue,js,ts}',
    './app.vue',
    './error.vue'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fdf8f6',
          100: '#f2e8e5',
          200: '#eaddd7',
          300: '#e0aea0',
          400: '#d38b77',
          500: '#c06b52', // Warm terracotta
          600: '#ad553c',
          700: '#8c412c',
          800: '#733726',
          900: '#431f15',
          950: '#260e09',
        },
        ocean: {
          50: '#f0f7ff',
          500: '#0284c7',
          600: '#0369a1',
          700: '#075985',
          900: '#0c4a6e',
        },
        emeraldGlow: {
          500: '#10b981',
          600: '#059669',
        },
        surface: {
          light: '#f8fafc',
          cardLight: '#ffffff',
          dark: '#090d16',
          cardDark: '#131b2e',
          borderDark: '#1e293b'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      boxShadow: {
        'subtle': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        'premium': '0 20px 40px -15px rgba(192, 107, 82, 0.12)',
        'glow-brand': '0 0 30px -5px rgba(192, 107, 82, 0.35)',
        'card-hover': '0 22px 45px -10px rgba(0, 0, 0, 0.12)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      }
    },
  },
  plugins: [],
}
