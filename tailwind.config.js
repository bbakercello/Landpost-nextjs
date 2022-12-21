/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.tsx", "./components/**/*.tsx"],
  theme: {
    extend: {},
  },
  plugins: ["tailwindcss", "postcss-preset-env"],
};
