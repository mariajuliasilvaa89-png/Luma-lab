import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        graphite: "#151515",
        ink: "#242424",
        mist: "#f6f7f8",
        line: "#e9eaec",
        luma: {
          yellow: "#ffd447",
          pink: "#ff75b7",
          lilac: "#b59cff",
          blue: "#76c8ff",
          orange: "#ff9f5a"
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-inter)", "ui-sans-serif", "system-ui"]
      },
      boxShadow: {
        soft: "0 18px 50px rgba(21, 21, 21, 0.08)"
      },
      animation: {
        float: "float 7s ease-in-out infinite",
        "fade-up": "fadeUp 0.7s ease both"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" }
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        }
      }
    }
  },
  plugins: []
};

export default config;
