import { ImgShape, TextShape } from "../../../shared/type/liket";
import { SetState } from "../../../shared/type/react";
import { IconToStickerNumberMap } from "../ui/consts/icon";
import { CardSizeType } from "../ui/types/Card";
import { Sticker } from "../ui/types/Icon";
import { findLowestMissingNumber } from "../util/helper";

interface UseWriteTabProps {
  imgShapes: ImgShape[];
  isTextShapeSelected: boolean;
  selectedImgShapeCode: number | undefined;
  setTextShape: SetState<TextShape | undefined>;
  setImgShapes: SetState<ImgShape[]>;
  setSize: SetState<CardSizeType>;
  setSelectedIndex: SetState<number>;
}

const useWriteTab = ({
  imgShapes,
  isTextShapeSelected,
  selectedImgShapeCode,
  setTextShape,
  setImgShapes,
  setSize,
  setSelectedIndex,
}: UseWriteTabProps) => {
  const handleChangeTab = (index: number) => setSelectedIndex(index);

  const handleClickRemoveItem = () => {
    if (isTextShapeSelected) {
      setSelectedIndex(0);
      setTextShape(undefined);
    } else {
      const newShapes = imgShapes.filter(
        ({ code }) => code !== selectedImgShapeCode
      );

      setImgShapes(newShapes);
    }
  };

  const handleChangeSize = (size: CardSizeType) => setSize(size);

  const handleInsertSticker = async (sticker: Sticker) => {
    const num_of_images = imgShapes.length;
    const stickerNumber = IconToStickerNumberMap[sticker];

    if (num_of_images >= 10) {
      return false;
    }

    setImgShapes([
      ...imgShapes,
      {
        code: findLowestMissingNumber(imgShapes.map(({ code }) => code)),
        stickerNumber,
        width: 80,
        height: 80,
        x: 0,
        y: 0,
        rotation: 0,
      },
    ]);
  };

  return {
    handleChangeTab,
    handleClickRemoveItem,
    handleChangeSize,
    handleInsertSticker,
  };
};

export default useWriteTab;
