/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'smu-blue': '#003D7C',
        'smu-gold': '#D4A76A',
        'smu-red': '#C8102E',
      }
    },
  },
  plugins: [],
}
