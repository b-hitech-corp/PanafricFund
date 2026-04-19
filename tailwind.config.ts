import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#F6F0E7",
        bronze: "#B07A4F",
        brown: "#3F281A",
        mutedbronze: "#D6B79A",
      },
      boxShadow: {
        soft: "0 10px 30px -12px rgba(30,16,6,0.25)",
      },
    },
  },
  plugins: [],
} satisfies Config;
