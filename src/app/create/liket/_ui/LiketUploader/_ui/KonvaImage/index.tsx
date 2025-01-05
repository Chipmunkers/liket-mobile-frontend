import Konva from "konva";
import { useEffect, useRef, useState } from "react";
import { Transformer, Image } from "react-konva";
import { Props } from "./types";
import { getRefValue } from "@/shared/helpers/getRefValue";
import {
  LIKET_CARD_HEIGHT,
  LIKET_CARD_WIDTH,
} from "@/app/create/liket/_consts/size";

const stickerNumberToSticker = {
  1: "꽃",
  2: "리본",
  3: "리본끈1",
  4: "리본끈2",
  5: "무지개",
  6: "반짝이",
  7: "별1",
  8: "별2",
  9: "선글라스",
  10: "스마일",
  11: "음표1",
  12: "음표2",
  13: "클로버",
  14: "하트",
} as {
  [key: number]: string;
};

const KonvaImage = ({ shapeProps, isSelected, onSelect, onChange }: Props) => {
  const imageRef = useRef<Konva.Image>(null);
  const trRef = useRef<Konva.Transformer>(null);
  const [canvasImage, setCanvasImage] = useState<HTMLImageElement>();

  useEffect(() => {
    if (isSelected) {
      getRefValue(trRef).nodes([getRefValue(imageRef)]);
      getRefValue(trRef).getLayer();
    }
  }, [isSelected]);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `/stickers/${stickerNumberToSticker[shapeProps.stickerNumber]}.svg`
        );
        const blob = await response.blob();
        const reader = new FileReader();
        reader.onload = () => {
          const image = new window.Image();
          image.src = reader.result as string;
          image.onload = () => {
            setCanvasImage(image);
          };
        };
        reader.readAsDataURL(blob);
      } catch (error) {
        console.error("스티커를 가져오는 도중 에러가 발생했습니다", error);
      }
    })();
  }, [shapeProps, shapeProps.code, shapeProps.stickerNumber]);

  return (
    <>
      <Image
        alt="스티커 이미지"
        x={+LIKET_CARD_WIDTH.replace("px", "") / 2 - 40}
        y={+LIKET_CARD_HEIGHT.replace("px", "") / 2 - 40}
        image={canvasImage}
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
