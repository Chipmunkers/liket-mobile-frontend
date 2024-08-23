import { CardSizeType } from "@/app/create/liket/types";
import Konva from "konva";
import { RefObject } from "react";
import { RequireProperty } from "@/shared/types/util";
import { ShapeConfig } from "konva/lib/Shape";

export type StrictShapeConfig = RequireProperty<ShapeConfig, "id">;

export type Props = {
  uploadedImage: HTMLImageElement | undefined;
  selectedShapeId: string;
  shapes: StrictShapeConfig[];
  stageRef: RefObject<Konva.Stage>;
  size: CardSizeType;
  onSelectShape: (shapeId: string) => void;
  onChangeShape: (shapes: StrictShapeConfig[]) => void;
  onUploadImage: (dataUrl: HTMLImageElement) => void;
};
