import { CARD_SIZE } from "./_consts/size";
import { IconName } from "./_consts/icon";
import { COLOR_TOKENS } from "./_consts/color";

export type IconType =
  | IconName
  | { name: IconName; isDisabled?: boolean; isActive?: boolean };

export type CardSizeType = keyof typeof CARD_SIZE;

export type ColorTokensType = (typeof COLOR_TOKENS)[number];
