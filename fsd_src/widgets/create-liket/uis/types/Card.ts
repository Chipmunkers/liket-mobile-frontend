import { ShapeConfig } from "konva/lib/Shape";
import { CARD_SIZE } from "../consts/card";
import { COLOR_TOKENS } from "../consts/color";

export type CardSizeType = keyof typeof CARD_SIZE;

export type ColorTokensType = (typeof COLOR_TOKENS)[number];

export type StrictShapeConfig = ShapeConfig & {
  code: number;
  stickerNumber: number;
};
