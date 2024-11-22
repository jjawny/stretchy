/** @type {import('tailwindcss').Config} */
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
    },
  },
  plugins: [],
};
