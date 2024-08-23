import { KeyValuePair, ResolvableTo } from "tailwindcss/types/config";

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

export const TypographyTextScale: FontSize = {
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

export const ButtonTextScale: FontSize = {
  button1: ["16px", { fontWeight: 700 }],
  button2: ["16px", { fontWeight: 400 }],
  button3: ["14px", { fontWeight: 700 }],
  button4: ["14px", { fontWeight: 400 }],
  button5: ["12px", { fontWeight: 700 }],
  button6: ["12px", { fontWeight: 400 }],
};
