import type { Config } from "tailwindcss";
import config from "@repo/ui/tailwind.config";
import typography from "@tailwindcss/typography";

const webConfig = {
  ...config,
  darkMode: "class",
  presets: [config],

  theme: {
    extend: {},
  },

  plugins: [
    ...(config.plugins || []),
    typography,
  ],
} satisfies Config;

export default webConfig;