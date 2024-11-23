/** @type {import("prettier").Config} */
const config = {
  printWidth: 120,
  plugins: [require.resolve("prettier-plugin-tailwindcss")],
};

module.exports = config;
