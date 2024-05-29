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
        'dim-black-start': '#4b4b4b',
        'dim-black-middle': '#3a3a3a',
        'dim-black-end': '#2a2a2a'
      }
        
    },
  },
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
  
};





