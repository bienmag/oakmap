/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './Components/**/*.{js,ts,jsx,tsx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      sans: ['ui-sans-serif', 'system-ui'],
    },
    extend: {
      colors: {
        'ylw-palette': '#F1DBC7',
        'dark-palette': '#1E1937',
        'org-palette': '#E6806C',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
