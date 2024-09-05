import {
  LIKET_CARD_HEIGHT,
  LIKET_CARD_WIDTH,
} from "./src/app/create/liket/_consts/size";
import { colors } from "./src/shared/style/color";
import { ButtonTextScale, TypographyTextScale } from "./src/shared/style/font";
import { PAGE_CONTENT_MAX_WIDTH } from "./src/shared/style/page";
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  important: true,
  theme: {
    extend: {
      keyframes: {
        bounce1: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        bounce2: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        bounce3: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        bounce1: "bounce1 0.6s infinite",
        bounce2: "bounce2 0.6s infinite 0.2s",
        bounce3: "bounce3 0.6s infinite 0.4s",
      },
      screens: {
        sm: "390px",
      },
      fontSize: { ...TypographyTextScale, ...ButtonTextScale },
      colors: colors,
      width: {
        content: PAGE_CONTENT_MAX_WIDTH,
        "liket-card": LIKET_CARD_WIDTH,
      },
      height: {
        "liket-card": LIKET_CARD_HEIGHT,
      },
      maxWidth: {
        content: PAGE_CONTENT_MAX_WIDTH,
      },
      boxShadow: {
        "01": "0px -8px 16px 4px rgba(0, 0, 0, 0.04)",
        "02": "8px 8px 16px 4px rgba(0, 0, 0, 0.04)",
        "03": "0px 0px 8px 16px rgba(0, 0, 0, 0.04)",
        "04": "0px 0px 16px rgba(0, 0, 0, 0.04)",
        "05": "0px 0px 16px 4px rgba(0, 0, 0, 0.04)",
        "06": "0px 0px 8px 8px rgba(0, 0, 0, 0.04)",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
export default config;
