// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx}",,
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Define your custom colors that reference CSS variables
        // This allows you to use classes like `bg-background` and `text-foreground`
        background: 'var(--color-background)',
        foreground: 'var(--color-foreground)',
        // You might have a teal-499 in your custom colors here if it's intentional
        // 'teal-499': '#your-specific-teal-color-code', // Example if you had a custom color
      },
      fontFamily: {
        // Reference your CSS font variables here
        sans: ['var(--font-geist-sans)', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
    },
  },
  plugins: [],
};