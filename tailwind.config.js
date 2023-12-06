/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      backgroundColor: {
        'custom-dark': '#2B2A33',
      },
      ringColor: {
        'custom-dark': '#2B2A33',
      },
    },
  },
  plugins: [],
}


