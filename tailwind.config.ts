import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#060816",
        cyanGlow: "#22d3ee",
        blueGlow: "#38bdf8",
        violetGlow: "#8b5cf6"
      },
      boxShadow: {
        glow: "0 0 42px rgba(56,189,248,.22)",
        violet: "0 0 46px rgba(139,92,246,.20)"
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
