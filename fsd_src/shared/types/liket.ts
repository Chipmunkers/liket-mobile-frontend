import { ShapeConfig } from "konva/lib/Shape";

export type TextShape = Pick<ShapeConfig, "fill" | "text" | "x" | "y">;

export type ImgShape = Pick<
  ShapeConfig,
  "width" | "height" | "x" | "y" | "rotation"
> & { code: number; stickerNumber: number };

export interface BgImgInfo {
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  offsetX: number;
  offsetY: number;
}
