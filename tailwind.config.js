/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        barber: {
          gold: "#C8A951",
          "gold-light": "#E8D48B",
          "gold-dark": "#A07D2E",
          dark: {
            50: "#1A1A2E",
            100: "#16213E",
            200: "#0F3460",
            300: "#1A1A1A",
            400: "#121212",
            500: "#0D0D0D",
          },
          cream: "#F5F0E8",
        },
      },
      fontFamily: {
        heading: ["Playfair Display", "serif"],
        body: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
