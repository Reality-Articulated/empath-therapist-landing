/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // Soft elevation for the calm marketing style (replaces the old
      // hard offset shadows).
      boxShadow: {
        soft: '0 1px 2px rgba(28, 25, 23, 0.04), 0 8px 24px -12px rgba(28, 25, 23, 0.10)',
        lift: '0 2px 4px rgba(28, 25, 23, 0.04), 0 24px 48px -20px rgba(28, 25, 23, 0.18)',
      },
    },
  },
  plugins: [],
};
