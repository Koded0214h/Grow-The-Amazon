/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./public/index.html"
  ],
  darkMode: "class",
  theme: {
    // Override the default borderRadius completely
    borderRadius: {
      'DEFAULT': '1rem',
      'lg': '2rem',
      'xl': '3rem', 
      'full': '9999px',
      'none': '0px',
      'sm': '0.125rem',
      'md': '0.375rem',
      '2xl': '1rem',
    },
    extend: {
      colors: {
        "primary": "#0df220", // Updated to match Forest green
        "background-light": "#f5f8f6", // Updated to match Forest
        "background-dark": "#102211", // Updated to match Forest
      },
      fontFamily: {
        "display": ["Space Grotesk", "sans-serif"]
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries'),
  ],
}