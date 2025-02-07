import type { Config } from "tailwindcss";
import config from "@repo/ui/tailwind.config";

const webConfig = {
  ...config,
  presets: [config],
  theme: {
    
  },
} satisfies Config;

export default webConfig;