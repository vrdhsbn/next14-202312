import { defineConfig } from '@pandacss/dev'

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ['./app/**/*.{js,jsx,ts,tsx}', './pages/**/*.{js,jsx,ts,tsx}'],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {
      keyframes: {
        toastFadeIn: {
          '0%': { opacity: 0, transform: 'translateX(4px)' },
          '100%': { opacity: 1, transform: 'translateX(0)' },
        },
      },
    },
  },

  // The output directory for your css system
  outdir: 'styled-system',

  jsxFramework: 'react',
})
