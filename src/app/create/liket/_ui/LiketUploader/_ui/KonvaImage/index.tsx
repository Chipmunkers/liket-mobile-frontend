import Konva from "konva";
import { useEffect, useRef } from "react";
import { Transformer, Image } from "react-konva";
import { Props } from "./types";
import { getRefValue } from "@/shared/helpers/getRefValue";
import {
  LIKET_CARD_HEIGHT,
  LIKET_CARD_WIDTH,
} from "@/app/create/liket/_consts/size";

const KonvaImage = ({ shapeProps, isSelected, onSelect, onChange }: Props) => {
  const imageRef = useRef<Konva.Image>(null);
  const trRef = useRef<Konva.Transformer>(null);

  useEffect(() => {
    if (isSelected) {
      getRefValue(trRef).nodes([getRefValue(imageRef)]);
      getRefValue(trRef).getLayer();
    }
  }, [isSelected]);

  return (
    <>
      <Image
        alt="스티커 이미지"
        x={+LIKET_CARD_WIDTH.replace("px", "") / 2 - 40}
        y={+LIKET_CARD_HEIGHT.replace("px", "") / 2 - 40}
        image={shapeProps.image}
        onTouchStart={onSelect}
        onMouseDown={onSelect}
        onClick={onSelect}
        onTap={onSelect}
        ref={imageRef}
        {...shapeProps}
        draggable
        onDragEnd={(e) => {
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y(),
            rotation: e.target.rotation(),
          });
        }}
        onTransformEnd={() => {
          const node = getRefValue(imageRef);
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          node.scaleX(1);
          node.scaleY(1);
          onChange({
            ...shapeProps,
            x: node.x(),
            y: node.y(),
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(node.height() * scaleY),
            rotation: node.rotation(),
          });
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          flipEnabled={false}
          boundBoxFunc={(oldBox, newBox) => {
            if (Math.abs(newBox.width) < 24 || Math.abs(newBox.height) < 24) {
              return oldBox;
            }

            return newBox;
          }}
        />
      )}
    </>
  );
};

export default KonvaImage;
