import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./modules/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#effdf5",
          100: "#d9fbe8",
          200: "#b5f5d3",
          300: "#7ceab6",
          400: "#45d895",
          500: "#22c77a",
          600: "#13a866",
          700: "#118655",
          800: "#126a48",
          900: "#11573e",
          950: "#063122"
        }
      },
      boxShadow: {
        soft: "0 24px 80px -36px rgba(15, 23, 42, 0.28)",
        glow: "0 16px 50px -22px rgba(34, 199, 122, 0.55)"
      }
    }
  },
  plugins: []
};

export default config;
