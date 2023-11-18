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
        grey: '#727272',
      }
    },
  },
  plugins: [],
}
export default config
