/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      widths:{
        '10%' : '10%',
        '20%' : '20%',
        '30%' : '30%',
        '40%' : '40%',
      },
      colors: {
        wizeblue: {
          50: "#E1F7FF",
          100: "#43C2FF",
          200: "#00ACFF",
          300: "#F2FAFD",
        },
        wizegray: {
          100: "#202529",
        },
        wizewhite:{
          100: "#F2FAFD",
        },
      }
    },
  },
  plugins: [],
}
