import { TextShape } from "@/app/create/liket/types";
import { ShapeConfig } from "konva/lib/Shape";

export type Props = {
  shapeProps: TextShape;
  isSelected: boolean;
  onChange: (newAttrs: TextShape) => void;
  onSelect: () => void;
};
