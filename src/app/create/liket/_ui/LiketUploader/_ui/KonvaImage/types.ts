import { ImgShape } from "../../../../types";

export type Props = {
  shapeProps: ImgShape;
  isSelected: boolean;
  onChange: (newAttrs: ImgShape) => void;
  onSelect: () => void;
};
