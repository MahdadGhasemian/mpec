import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx,mdx}"],
  theme: {
    extend: {
      screens: {
        "sm-down": { max: "639px" },
        "xtra-small": { min: "319px" },
      },
    },
  },
} satisfies Config;
