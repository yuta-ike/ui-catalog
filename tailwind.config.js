const plugin = require("tailwindcss/plugin")

/** @type {import('@types/tailwindcss/tailwind-config').TailwindConfig} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".typo-h1": {
          "font-size": "clamp(18px, 3vw, 24px)",
          "line-height": "1.6",
          "font-weight": "700",
        },
        ".typo-h2": {
          "font-size": "18px",
          "line-height": "1.6",
          "font-weight": "700",
        },
        ".typo-h3": {
          "font-size": "14px",
          "line-height": "1.6",
          "font-weight": "700",
        },
      })
    }),
  ],
}

module.exports = config
