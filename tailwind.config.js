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
    },
  },
  plugins: [],
}


