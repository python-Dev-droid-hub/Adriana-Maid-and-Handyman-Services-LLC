import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const softShadow = "0 12px 40px -16px rgb(11 37 69 / 0.18)";
const softShadowLg = "0 22px 50px -20px rgb(11 37 69 / 0.22)";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#0B2545",
        teal: "#13A89E",
        orange: "#FF8A3D",
        offwhite: "#F7FAFC",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        heading: ["var(--font-poppins)", "Poppins", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      borderRadius: {
        "card-sm": "20px",
        card: "24px",
        "card-lg": "28px",
      },
      boxShadow: {
        soft: softShadow,
        "soft-lg": softShadowLg,
        "header-float": "0 18px 44px -18px rgb(11 37 69 / 0.22)",
        glow: "0 14px 34px -10px rgb(255 138 61 / 0.65)",
        "glow-teal": "0 14px 34px -10px rgb(19 168 158 / 0.45)",
      },
      backgroundImage: {
        "sky-gradient": "linear-gradient(180deg, #E6F3FF 0%, #F7FAFC 100%)",
        "cta-gradient": "linear-gradient(135deg, #0B2545 0%, #0E5B6E 52%, #13A89E 100%)",
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 14px 34px -10px rgb(255 138 61 / 0.55)" },
          "50%": { boxShadow: "0 18px 40px -6px rgb(255 138 61 / 0.8), 0 0 0 10px rgb(255 138 61 / 0.12)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translate3d(0, 0, 0)" },
          "50%": { transform: "translate3d(0, -14px, 0)" },
        },
      },
      animation: {
        "pulse-glow": "pulse-glow 2.6s ease-in-out infinite",
        "float-slow": "float-slow 5.5s ease-in-out infinite",
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".glass": {
          backgroundColor: "rgb(255 255 255 / 0.7)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: "1px solid #ffffff",
          boxShadow: softShadow,
        },
      });
    }),
  ],
};

export default config;
