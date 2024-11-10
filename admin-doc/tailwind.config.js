/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{html,js,jsx,ts,tsx}", 
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3490dc', // Define a custom blue color as 'primary'
      },
    },
  },
  plugins: [],
}
