/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        wizeblue: {
          100: "#43C2FF",
          200: "#00ACFF",
          300: "#F2FAFD",
        },
        wizegray: {
          100: "#202529",
        }
      }
    },
  },
  plugins: [],
}
