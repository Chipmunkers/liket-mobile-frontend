import { CardSizeType, StrictShapeConfig } from "../../types";
import Konva from "konva";
import { RefObject } from "react";

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
