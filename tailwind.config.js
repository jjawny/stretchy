/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "dot-matrix": "radial-gradient(circle, #dadada 1px, transparent 1px)",
      },
      backgroundSize: {
        "dot-matrix": "30px 30px", // dot spacing
      },
      fontFamily: {
        syne: ["Syne", ...defaultTheme.fontFamily.serif],
      },
    },
  },
  plugins: [],
};
