import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        blurple: '#635BFF',
        'text-primary': '#0A2540',
        'text-secondary': '#425466',
        'page-bg': '#F6F9FC',
        'card-bg': '#FFFFFF',
        'border-color': '#E6EBF1',
        'code-bg': '#1A1F36',
        'code-text': '#E8E8FF',
        'success-green': '#30B130',
        'pending-orange': '#FF8C00',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
