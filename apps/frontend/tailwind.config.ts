import type { Config } from "tailwindcss";
import daisyui from "daisyui";

export default {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [daisyui],
  daisyui: {
    themes: "light",
    darkTheme: "night",
    base: true,
    styled: true,
    utils: true,
    logs: true,
    themeRoot: ":root",
  },
} satisfies Config & { daisyui: typeof daisyui extends (config: infer C) => unknown ? C : never };
