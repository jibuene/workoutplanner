const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter var"', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  daisyui: {
    themes: [
      "retro",
      "lofi",
      "valentine",
      "dracula",
      "coffee",
      "garden",
      {
        icecream: {
          "primary": "#66D186",
          "secondary": "#DE699E",
          "accent": "#F6FD9B",
          "neutral": "#FFE5D9",
          "base-100": "#fda4af",
          "info": "#2463EB",
          "success": "#16A249",
          "warning": "#DB7706",
          "error": "#DC2828"
        }
      }, {
        teddy: {
          "primary": "#B75353",
          "secondary": "#326E6E",
          "accent": "#429242",
          "neutral": "#FFDDC2",
          "base-100": "#6E3C12",
          "info": "#2463EB",
          "success": "#16A249",
          "warning": "#DB7706",
          "error": "#DC2828"
        }
      }
    ]
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/aspect-ratio'),
    require('daisyui')
  ]
}
