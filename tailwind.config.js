/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./App.tsx","./app/**/*.{js,jsx,ts,tsx}","./navigation/**/*.{js,jsx,ts,tsx}" , "./screens/**/*.{js,jsx,ts,tsx}",],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [ ],
}

