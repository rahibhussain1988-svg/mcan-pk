/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        imam: {
          blue: '#0062B1',
          navy: '#062B54',
          red: '#E30613',
          emerald: '#008060',
          amber: '#D97706',
          surface: '#F8FAFC',
          card: '#FFFFFF',
          border: '#E2E8F0',
          muted: '#64748B'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        urdu: ['Noto Nastaliq Urdu', 'Noto Naskh Arabic', 'MBSania', 'sans-serif'],
        sindhi: ['Noto Naskh Arabic', 'MBSania', 'sans-serif']
      }
    },
  },
  plugins: [],
}
