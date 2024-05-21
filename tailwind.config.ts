const { fontFamily } = require("tailwindcss/defaultTheme");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--poppins)", ...fontFamily.sans],
      },
      colors:{
        "light":"#F4F2EE",
        "primary":"#365394",
        "btn":"#365495",
        "danger":"#D83564",
      }
        
    },
  },
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [],
  
};





