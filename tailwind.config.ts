import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        void: { DEFAULT: "#08080a", deep: "#050506" },
        surface: { DEFAULT: "#101013", raised: "#17171b" },
        hair: { DEFAULT: "#26262b", bright: "#35353c" },
        chalk: { DEFAULT: "#f4f3f0", dim: "#9c9ca6", faint: "#7e7e88" },
        signal: { DEFAULT: "#3b5bff", soft: "#8fa4ff", deep: "#1f38c9" },
      },
      fontFamily: {
        sans: ["Instrument Sans", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["Instrument Serif", "ui-serif", "Georgia", "serif"],
      },
      letterSpacing: { tightest: "-0.05em", tighter: "-0.032em", label: "0.16em" },
      maxWidth: { shell: "90rem", prose: "36rem" },
      transitionTimingFunction: { brand: "cubic-bezier(0.22, 1, 0.36, 1)" },
      animation: { marquee: "marquee 42s linear infinite" },
      keyframes: {
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
      },
    },
  },
  plugins: [],
} satisfies Config;
