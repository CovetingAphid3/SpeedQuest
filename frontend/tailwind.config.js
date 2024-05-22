/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{html,js,css}"],
    safelist: ["bg-primary", "bg-secondary", "bg-dimWhite", "bg-dimBlue", "bg-blue", "bg-crimson"], // Add your custom color classes here
 theme: {
    extend: {
      colors: {
        primary: "#0e1111",
        secondary: "#00f6ff",
        dimWhite: "rgba(255, 255, 255, 0.7)",
        dimBlue: "rgba(9, 151, 124, 0.1)",
        blue: "#0A2342",
        crimson: "#A30014"
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        roboto: ["Roboto","sans-serif"]
      },
    },
    screens: {
      xs: "480px",
      ss: "620px",
      sm: "768px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
  },
  plugins: [],
};
