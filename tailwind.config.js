/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'sankalpbanner3': "url('/sankalpbanner3.png')",
        'sankalpbanner1': "url('/sankalpbanner1.png')",
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}