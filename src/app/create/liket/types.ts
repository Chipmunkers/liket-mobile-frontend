import { CARD_SIZE } from "./_consts/size";
import { IconName } from "./_consts/icon";
import { COLOR_TOKENS } from "./_consts/color";
import { ShapeConfig } from "konva/lib/Shape";

export type IconType =
  | IconName
  | { name: IconName; isDisabled?: boolean; isActive?: boolean };

export type CardSizeType = keyof typeof CARD_SIZE;

export type ColorTokensType = (typeof COLOR_TOKENS)[number];

export type StrictShapeConfig = ShapeConfig & {
  code: number;
  stickerNumber: number;
};

export type TextShape = Pick<ShapeConfig, "fill" | "text" | "x" | "y">;

export type ImgShape = Pick<
  ShapeConfig,
  "width" | "height" | "x" | "y" | "rotation"
> & { code: number; stickerNumber: number };

export interface CreateLiketPayload {
  reviewIdx: number;
  textShape?: TextShape;
  imgShapes?: ImgShape[];
  size: 1 | 2 | 3;
  bgImgInfo: BgImgInfo;
  bgImgPath: string;
  cardImgPath: string;
  description: string;
}

export interface BgImgInfo {
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  offsetX: number;
  offsetY: number;
}
