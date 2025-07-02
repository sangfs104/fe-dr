// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./src/**/*.{js,ts,jsx,tsx,mdx}", // ← quan trọng với folder src
//     "./components/**/*.{js,ts,jsx,tsx,mdx}",
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// };
/** @type {import('tailwindcss').Config} */
module.exports = {
   darkMode: 'class',
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // ← quan trọng với folder src
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
 theme: {
  extend: {
    animation: {
      'fade-in-up': 'fadeInUp 0.4s ease-out',
    },
    keyframes: {
      fadeInUp: {
        '0%': { opacity: 0, transform: 'translateY(20px)' },
        '100%': { opacity: 1, transform: 'translateY(0)' },
      },
    },
  },
}
,
  plugins: [],
};
