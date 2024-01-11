/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      fontFamily: {
        'roboto': ['Roboto', 'sans-serif'],
      },
      fontSize: {
        '64': '64px',
        '24': '24px',
      },
      colors: {
        'custom-dark': '#2B2A33',
      },
      boxShadow: {
        'symmetric-xl': '0 0 10px rgba(0, 0, 0, 0.1), 0 0 10px rgba(0, 0, 0, 0.04)',
        'symmetric': '0 0 9px rgba(140, 140, 140, 0.35)',
      },
    },
  },
  plugins: [],
}


