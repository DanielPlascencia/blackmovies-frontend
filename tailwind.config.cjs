/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      movilS: "320px",
      movilM: "375px",
      movilL: "425px",
      tablet: "768px",
      laptop: "1024px",
      desktop: "1440px",
      desktopL: "2560px",
    },
    extend: {},
  },
  plugins: [],
};
