import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sky: {
          light: "#BEE7F5",
          DEFAULT: "#7EC8E3",
          deep: "#4A90C4",
          dusk: "#5B6EA8",
        },
        grass: {
          light: "#9ED18B",
          DEFAULT: "#6BAA5C",
          dark: "#4A7C3F",
        },
        wood: {
          light: "#B98452",
          DEFAULT: "#8B5A2B",
          dark: "#5C3A1E",
        },
        cream: "#FBF3DE",
        parchment: "#F3E6C4",
        blossom: {
          light: "#FBD4DA",
          DEFAULT: "#F2A6B0",
          dark: "#D9727F",
        },
        ink: "#241D2E",
        dusk: {
          DEFAULT: "#2B2340",
          light: "#4A3A63",
        },
        sunset: {
          DEFAULT: "#F4A259",
          deep: "#E8734A",
        },
        gold: "#E8C468",
      },
      fontFamily: {
        pixel: ["var(--font-press-start)", "monospace"],
        body: ["var(--font-pixelify)", "monospace"],
      },
      boxShadow: {
        pixel: "4px 4px 0px 0px rgba(36,29,46,1)",
        "pixel-sm": "2px 2px 0px 0px rgba(36,29,46,1)",
        "pixel-lg": "6px 6px 0px 0px rgba(36,29,46,1)",
      },
      keyframes: {
        "cloud-drift": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(30px)" },
        },
        blink: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
        "bob": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        "fly-across": {
          "0%": { transform: "translateX(-10vw) translateY(0)" },
          "50%": { transform: "translateX(50vw) translateY(-20px)" },
          "100%": { transform: "translateX(110vw) translateY(0)" },
        },
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "20%": { transform: "translateX(-6px)" },
          "40%": { transform: "translateX(5px)" },
          "60%": { transform: "translateX(-4px)" },
          "80%": { transform: "translateX(3px)" },
        },
        "fall-fade": {
          "0%": { transform: "translateY(-10px) rotate(0deg)", opacity: "1" },
          "100%": { transform: "translateY(160px) rotate(180deg)", opacity: "0" },
        },
      },
      animation: {
        "cloud-drift": "cloud-drift 8s ease-in-out infinite alternate",
        blink: "blink 1s steps(1) infinite",
        bob: "bob 2s ease-in-out infinite",
        "fly-across": "fly-across 18s linear infinite",
        shake: "shake 0.4s ease-in-out",
        "fall-fade": "fall-fade 1.2s ease-in forwards",
      },
    },
  },
  plugins: [],
};
export default config;
