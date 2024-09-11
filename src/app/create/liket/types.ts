import { CARD_SIZE } from "./_consts/size";
import { IconName } from "./_consts/icon";
import { COLOR_TOKENS } from "./_consts/color";
import { RequireProperty } from "@/shared/types/util";
import { ShapeConfig } from "konva/lib/Shape";

export type IconType =
  | IconName
  | { name: IconName; isDisabled?: boolean; isActive?: boolean };

export type CardSizeType = keyof typeof CARD_SIZE;

export type ColorTokensType = (typeof COLOR_TOKENS)[number];

export type StrictShapeConfig = RequireProperty<ShapeConfig, "id">;

export interface TextShape {
  type: "text";
  id: number; // front에서 임의로 생성하고있음.
  fill: string; // 컬러값
  text: string;
  x: string;
  y: string;
}

export interface ImageShape {
  type: "image";
  id: number;
  imageSrc: string;
  width: number;
  height: number;
  x: number;
  y: number;
}

export interface CardImageInformation {
  x: number;
  y: number;
  width: number;
  height: number;
  angle: number;
  offsetX: number;
  offsetY: number;
}

export interface Payload {
  shapes: (TextShape | ImageShape)[];
  cardImageSrc: string; // Blob Data URL
  cardSize: "SMALL" | "MEDIUM" | "LARGE";
  cardImageInformation: CardImageInformation;
}
