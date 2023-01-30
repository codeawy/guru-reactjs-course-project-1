/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        "products-grid": "repeat(auto-fill, minmax(250px, 1fr))",
      },
      colors: {
        primary: "#334155",
      },
    },
  },
  plugins: [],
};
