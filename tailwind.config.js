/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      gradientColorStops: {
        'f6c2f9': '#f6c2f9',
        '819ff9': '#819ff9',
      },
      colors: {
        'custom-red': '#ef4166',
        'customColor': '#93C4D1',
        'customColorA': '#18363E',
        'customColorB':'#3E88A5',
        'customColorC':'#2D5F6E'
      },
    },
  },
  variants: {},
  plugins: [],
})

