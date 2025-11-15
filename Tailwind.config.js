/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // ensure Tailwind scans your React components
  ],
  theme: {
    extend: {
       fontFamily: {
      poppins: ['Poppins', 'sans-serif'],
    },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0) rotate(0deg) scale(1)" },
          "25%": { transform: "translateY(-20px) rotate(5deg) scale(1.05)" },
          "50%": { transform: "translateY(-40px) rotate(-5deg) scale(0.95)" },
          "75%": { transform: "translateY(-20px) rotate(2deg) scale(1.02)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.3", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.3)" },
        },
      },
      animation: {
        float: "float 20s ease-in-out infinite",
        pulseGlow: "pulseGlow 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
