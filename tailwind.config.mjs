/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "media",
  theme: {
    extend: {
      animation: {
        progress: 'progress 1s infinite linear',
        backprog: 'backprog 1s infinite linear',
      },
      keyframes: {
        progress: {
          '0%': { transform: ' translateX(0) scaleX(0)' },
          '40%': { transform: 'translateX(0) scaleX(0.4)' },
          '100%': { transform: 'translateX(100%) scaleX(0.5)' },
        },
        backprog: {
          '0%': { transform: ' translateX(100%) scaleX(0.5)' },
          '40%': { transform: 'translateX(0) scaleX(0.4)' },
          '100%': { transform: 'translateX(0) scaleX(0)' },
        },
      },
      transformOrigin: {
        'left-right': '0% 50%',
        'right-left': '0% 50%',
      }
    },
  },
  plugins: [],
};
