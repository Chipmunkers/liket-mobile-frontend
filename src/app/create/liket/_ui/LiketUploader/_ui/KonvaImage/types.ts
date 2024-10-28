import { StrictShapeConfig } from "../../../../types";

export type Props = {
  shapeProps: StrictShapeConfig;
  isSelected: boolean;
  onChange: (newAttrs: StrictShapeConfig) => void;
  onSelect: () => void;
};
