/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        surface: '#FFFFFF',
        'surface-variant': '#F9F9F9',
        'border-subtle': '#EAEAEA',
        outline: '#7E7576',
        primary: '#000000',
        'brand-orange': '#FF6B00',
        'on-primary': '#FFFFFF',
        'text-muted': '#666666',
        secondary: '#000000',
        background: '#FFFFFF',
      },
      borderRadius: {
        DEFAULT: '8px',
        lg: '12px',
        xl: '16px',
        full: '9999px',
      },
      fontFamily: {
        sans: ['Geist', 'Inter', 'sans-serif'],
        body: ['Geist', 'Inter', 'sans-serif'],
        heading: ['Geist', 'Inter', 'sans-serif'],
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0%)' },
        },
      },
      animation: {
        marquee: 'marquee 65s linear infinite',
        'marquee-reverse': 'marquee-reverse 65s linear infinite',
      },
      boxShadow: {
        vercel: '0 0 0 1px rgba(0,0,0,.08), 0 2px 4px rgba(0,0,0,.04)',
        'vercel-hover': '0 0 0 1px rgba(0,0,0,.12), 0 8px 16px rgba(0,0,0,.08)',
      },
    },
  },
  plugins: [],
};
