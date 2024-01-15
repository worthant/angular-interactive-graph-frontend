/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js"
  ],
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
        primary: {"50":"#f0fdfa","100":"#ccfbf1","200":"#99f6e4","300":"#5eead4","400":"#2dd4bf","500":"#14b8a6","600":"#0d9488","700":"#0f766e","800":"#115e59","900":"#134e4a","950":"#042f2e"}
      },
      boxShadow: {
        'symmetric-xl': '0 0 10px rgba(0, 0, 0, 0.1), 0 0 10px rgba(0, 0, 0, 0.04)',
        'symmetric': '0 0 9px rgba(140, 140, 140, 0.25)',
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}


