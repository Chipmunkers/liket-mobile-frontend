import { generateRandomId } from "@/shared/helpers/random";
import {
  CardSizeType,
  IconType,
  ImageShape,
  StrictShapeConfig,
  TextShape,
} from "../types";
import { Dispatch } from "react";

interface Props {
  shapes: StrictShapeConfig[];
  selectedShapeId: string;
  setShapes: Dispatch<StrictShapeConfig[]>;
  setSize: Dispatch<CardSizeType>;
  setSelectedIndex: Dispatch<number>;
}

const useWriteTab = ({
  shapes,
  selectedShapeId,
  setShapes,
  setSize,
  setSelectedIndex,
}: Props) => {
  const handleChangeTab = (index: number) => setSelectedIndex(index);

  const handleClickRemoveItem = () => {
    const targetShape = shapes.find(({ id }) => id === selectedShapeId);

    if (targetShape?.type === "text") {
      setSelectedIndex(0);
    }

    const newShapes = shapes.filter(({ id }) => id !== selectedShapeId);
    setShapes(newShapes);
  };

  const handleChangeSize = (size: CardSizeType) => setSize(size);

  const handleInsertSticker = async (sticker: IconType) => {
    const num_of_images = shapes.map(({ type }) => type === "image").length;

    if (num_of_images > 10) {
      return false;
    }

    try {
      const response = await fetch(`/stickers/${sticker}.svg`);
      const blob = await response.blob();
      const reader = new FileReader();
      reader.onload = () => {
        const image = new window.Image();
        image.src = reader.result as string;
        image.onload = () => {
          setShapes([
            ...shapes,
            {
              type: "image",
              id: generateRandomId(10),
              image,
              width: 80,
              height: 80,
              x: 0,
              y: 0,
            },
          ]);
        };
      };
      reader.readAsDataURL(blob);
    } catch (error) {
      console.error("스티커를 가져오는 도중 에러가 발생했습니다", error);
    }
  };
  return {
    handleChangeTab,
    handleClickRemoveItem,
    handleChangeSize,
    handleInsertSticker,
  };
};

export default useWriteTab;
