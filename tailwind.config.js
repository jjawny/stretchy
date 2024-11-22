/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "dot-matrix":
          "radial-gradient(circle, #dadada 0.5px, transparent 0.5px)",
      },
      backgroundSize: {
        "dot-matrix": "11px 11px", // dot spacing
      },
      fontFamily: {
        syne: ["Syne", ...defaultTheme.fontFamily.serif],
      },
    },
  },
  plugins: [],
};
