import { ButtonVariant } from "../types";

export const ENABLE_STYLES: Record<ButtonVariant, string> = {
  primary:
    "bg-skyblue-01 text-white hover:bg-skyblue-02 active:bg-skyblue-03 focus:outline-skyblue-02 focus:outline-offset-[1px] focus:outline-[2px]",
  secondary:
    "bg-grey-01 text-black hover:bg-grey-02 active:bg-skyblue-01 active:text-white focus:outline-skyblue-02 focus:outline-offset-[1px] focus:outline-[2px]",
  ghost:
    "border-solid border-grey-02 border-[1px] hover:border-grey-02 active:border-skyblue-01 active:text-skyblue-01 active:border-[2px] focus:outline-[2px] focus:outline-offset-[1px] focus:outline-skyblue-02",
} as const;

export const DISABLE_STYLES: Record<ButtonVariant, string> = {
  primary: "bg-grey-01 text-grey-02",
  secondary: "bg-grey-01 text-grey-02",
  ghost: "text-grey-02 border-solid border-grey-01 border-[2px]",
} as const;
