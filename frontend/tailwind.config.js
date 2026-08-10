/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#0E4194',
          hover: '#1453B9',
          secondary: '#4B4B4B',
          text: '#393939',
          dark: '#091C3D'
        }
      },
      fontFamily: {
        sans: ['var(--font-rubik)', 'sans-serif']
      },
      aspectRatio: {
        reel: '9 / 16'
      }
    }
  },
  plugins: []
};
