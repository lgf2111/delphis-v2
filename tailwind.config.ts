import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [{
      mytheme: {
        "primary": "#1D4ED8",
        "secondary": "#9CA3AF",
        "accent": "#67e8f9",
        "neutral": "#CBE4F2",
        "base-100": "#FFFFFF",
        "info": "#7ee5f7",
        "success": "#22C55E",
        "warning": "#FACC15",
        "error": "#DC2626",
      }
    }]
  }
} satisfies Config;
