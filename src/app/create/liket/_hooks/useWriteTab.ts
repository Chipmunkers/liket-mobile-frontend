import { IconType } from "@/components/IconButtonGroup";
import { CardSizeType } from "@/components/WriteTab/SizeEdit";
import { ColorTokensType } from "@/components/WriteTab/TextEdit";
import { StrictShapeConfig } from "@/types/konva";
import { getXPos, yPos } from "@/utils/create-liket";
import { generateRandomId } from "@/utils/helpers";
import { Dispatch, SetStateAction, useState } from "react";

interface UseWriteTabParam {
  shapes: StrictShapeConfig[];
  setShapes: Dispatch<SetStateAction<StrictShapeConfig[]>>;
  selectedShapeId: string;
}

const useWriteTab = ({
  shapes,
  setShapes,
  selectedShapeId,
}: UseWriteTabParam) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isTextEnteringOnFrontSide, setIsTextEnteringOnFrontSide] =
    useState(false);
  const [size, setSize] = useState<CardSizeType>("LARGE");

  const handleClickRemoveItem = () => {
    const targetShape = shapes.find(({ id }) => id === selectedShapeId);

    if (targetShape?.type === "text") {
      setSelectedIndex(0);
    }

    const newShapes = shapes.filter(({ id }) => id !== selectedShapeId);
    setShapes(newShapes);
  };

  const handleChangeTab = (index: number) => setSelectedIndex(index);

  const handleClickFrontTextEnteringClose = () => {
    setSelectedIndex(0);
    setIsTextEnteringOnFrontSide(false);
  };

  const handleClickFrontTextEnteringCheck = (text: string) => {
    setShapes([
      ...shapes,
      {
        type: "text",
        id: generateRandomId(10),
        fill: "black",
        text,
        x: getXPos(text),
        y: yPos,
      },
    ]);

    setIsTextEnteringOnFrontSide(false);
  };

  const handleInsertTextTab = () => {
    const isTextExist = shapes.some(({ type }) => type === "text");
    !isTextExist && setIsTextEnteringOnFrontSide(true);
  };

  const handleChangeSize = (size: CardSizeType) => setSize(size);

  const handleInsertSticker = async (sticker: IconType) => {
    const num_of_images = shapes.map(({ type }) => type === "image").length;

    if (num_of_images > 10) {
      return false;
    }

    try {
      const response = await fetch(`/icons/stickers/${sticker}.svg`);
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

  const handleChangeInsertedTextColor = (fill: ColorTokensType) => {
    const textShapeIdx = shapes.findIndex(({ type }) => type === "text");

    const newShapes = [...shapes];
    newShapes[textShapeIdx] = {
      ...newShapes[textShapeIdx],
      fill,
    };

    setShapes(newShapes);
  };

  return {
    size,
    selectedIndex,
    isTextEnteringOnFrontSide,
    handleClickFrontTextEnteringCheck,
    handleClickRemoveItem,
    handleChangeTab,
    handleClickFrontTextEnteringClose,
    handleChangeInsertedTextColor,
    handleInsertTextTab,
    handleChangeSize,
    handleInsertSticker,
  };
};

export default useWriteTab;
