/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#BCE27F',  // Light green
        secondary: '#9A6735', // Brown
        background: '#E6F0DC', // Light green background
        accent: '#55883B',     // Dark green
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
