import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        playfair: ['PlayFair Display', 'serif'],
      },
      colors: {
        primary: {
          blue: '#0A2472',
          "blue-accent": '#001C55',
        },
        secondary: {
          blue: '#A6E1FA',
          "blue-accent": '#0E6BA8',
        },
        "dark-blue": '#00072D',
        white: '#FFFFFF',
        black: '#1C1C1C',
        grey: '#F4F4F4',
      },
      fontSize: {
        "text-s": [
          "12px",
          {
            lineHeight: "16px",
          },
        ],
        "text-m": [
          "14px",
          {
            lineHeight: "20px",
          },
        ],
        "text-l": [
          "16px",
          {
            lineHeight: "24px",
          },
        ],
        "heading-s": [
          "20px",
          {
            lineHeight: "28px",
          },
        ],
        "heading-m": [
          "28px",
          {
            lineHeight: "36px",
          },
        ],
        "heading-l": [
          "36px",
          {
            lineHeight: "44px",
          },
        ],
        "heading-xl": [
          "64px",
          {
            lineHeight: "72px",
          },
        ],
      },
      boxShadow: {
        custom: '2px 2px 7px 0px rgba(0, 0, 0, 0.25)',
      },
    },
  },
  plugins: [],
}
export default config
