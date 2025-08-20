/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./components/**/*.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#0235ED",
        secondary: "#FF8C00",
        success: "#008000",
        warnign: "#FF0000",
        background: "#F5F5F5",
        foreground: "#262626",
      },
    },
  },
  plugins: [],
};
