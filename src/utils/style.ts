import { KeyValuePair, ResolvableTo } from "tailwindcss/types/config";

/**
 * @deprecated
 */
type FontSize = ResolvableTo<
  KeyValuePair<
    string,
    | string
    | [fontSize: string, lineHeight: string]
    | [
        fontSize: string,
        configuration: Partial<{
          lineHeight: string;
          letterSpacing: string;
          fontWeight: string | number;
        }>
      ]
  >
>;

/**
 * @deprecated
 */
const TypographyScale: FontSize = {
  h1: [
    "18px",
    {
      fontWeight: 700,
    },
  ],
  h2: [
    "16px",
    {
      lineHeight: "20px",
      fontWeight: 700,
    },
  ],
  body1: [
    "14px",
    {
      lineHeight: "20px",
      fontWeight: 700,
    },
  ],
  body2: [
    "14px",
    {
      fontWeight: 700,
    },
  ],
  body3: [
    "14px",
    {
      lineHeight: "20px",
      fontWeight: 400,
    },
  ],
  body4: [
    "12px",
    {
      fontWeight: 700,
    },
  ],
  body5: ["12px", { lineHeight: "18px", fontWeight: 400 }],
  caption: [
    "12px",
    {
      fontWeight: 700,
    },
  ],
  flag: [
    "12px",
    {
      fontWeight: 700,
    },
  ],
  numbering1: [
    "16px",
    {
      fontWeight: 800,
    },
  ],
  numbering2: [
    "12px",
    {
      fontWeight: 800,
    },
  ],
  numbering3: [
    "12px",
    {
      fontWeight: 400,
    },
  ],
};
/**
 * @deprecated
 */
const ButtonScale: FontSize = {
  button1: ["16px", { fontWeight: 700 }],
  button2: ["16px", { fontWeight: 400 }],
  button3: ["14px", { fontWeight: 700 }],
  button4: ["14px", { fontWeight: 400 }],
  button5: ["12px", { fontWeight: 700 }],
  button6: ["12px", { fontWeight: 400 }],
};
/**
 * @deprecated
 */
const colors = {
  grey: {
    black: "rgba(0, 0, 0, 1)",
    "01": "rgba(240, 240, 240, 1)",
    "02": "rgba(217, 217, 217, 1)",
    "03": "rgba(176, 176, 176, 1)",
    "04": "rgba(124, 124, 124, 1)",
    white: "rgba(255, 255, 255, 1)",
  },
  skyblue: {
    "01": "#00C2FF",
    "02": "#00A6DB",
    "03": "#0088B4",
  },
  rosepink: {
    "01": "#FF005C",
  },
  red: "#e0483f",
  orange: "#ec682c",
  yellow: "#f5d949",
  green: "#4eab87",
  blue: "#3b85ca",
  purple: "#45098c",
};
/**
 * @deprecated
 */
export const PAGE_CONTENT_MAX_WIDTH = "600px";
/**
 * @deprecated
 */
export const variantToStyleMap = {
  primary:
    "bg-skyblue-01 text-white hover:bg-skyblue-02 active:bg-skyblue-03 focus:outline-skyblue-02 focus:outline-offset-[1px] focus:outline-[2px]",
  secondary:
    "bg-grey-01 text-black hover:bg-grey-02 active:bg-skyblue-01 active:text-white focus:outline-skyblue-02 focus:outline-offset-[1px] focus:outline-[2px]",
  ghost:
    "border-solid border-grey-02 border-[1px] hover:border-grey-02 active:border-skyblue-01 active:text-skyblue-01 active:border-[2px] focus:outline-[2px] focus:outline-offset-[1px] focus:outline-skyblue-02",
};
/**
 * @deprecated
 */
export const variantWithDisabledStyleMap = {
  primary: "bg-grey-01 text-grey-02",
  secondary: "bg-grey-01 text-grey-02",
  ghost: "text-grey-02 border-solid border-grey-01 border-[2px]",
};
/**
 * @deprecated
 */
export type TypographyVariant = keyof typeof TypographyScale;
/**
 * @deprecated
 */
export type ButtonVariant = keyof typeof ButtonScale;
/**
 * @deprecated
 */
export { TypographyScale, ButtonScale, colors };
