/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Nosifer: ['Nosifer', 'cursive'], // Ajoutez la police Nosifer
      },
    },
  },
  plugins: [],
};
