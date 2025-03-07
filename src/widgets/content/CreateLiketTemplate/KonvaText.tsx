import { colors } from "@/shared/style/color";
import { TextShape } from "@/shared/types/ui/liket/type";
import { Text, Rect, Group } from "react-konva";
import {
  FONT_SIZE,
  PADDING_BETWEEN_TEXT_AND_BOX,
  RECT_HEIGHT,
} from "./consts/card";
import { getPxLength } from "./utils/helper";

type Props = {
  shapeProps: TextShape;
  isSelected: boolean;
  onChange: (newAttrs: TextShape) => void;
  onSelect: () => void;
};

const KonvaText = ({ shapeProps, isSelected, onSelect, onChange }: Props) => {
  const { x, y, text, fill } = shapeProps;

  return (
    <>
      <Group
        draggable
        x={x}
        y={y}
        onTouchStart={onSelect}
        onMouseDown={onSelect}
        onClick={onSelect}
        onTab={onSelect}
        onDragEnd={(e) =>
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y(),
          })
        }
      >
        <Text
          text={text}
          fill={fill}
          fontSize={16}
          fontFamily="AppleSDGothicNeo"
          fontStyle="bold"
          y={(RECT_HEIGHT - FONT_SIZE) / 2 + 2}
          x={PADDING_BETWEEN_TEXT_AND_BOX}
        />
        <Rect
          stroke={colors["skyblue"]["02"]}
          strokeWidth={isSelected ? 1 : 0}
          width={
            getPxLength(shapeProps.text) + 2 * PADDING_BETWEEN_TEXT_AND_BOX
          }
          height={RECT_HEIGHT}
        />
      </Group>
    </>
  );
};

export default KonvaText;
