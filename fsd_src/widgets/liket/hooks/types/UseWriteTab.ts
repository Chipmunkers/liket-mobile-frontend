import { ImgShape, TextShape } from "../../../../shared/types/liket/card";
import { SetState } from "../../../../shared/types/react";
import { CardSizeType } from "../../uis/types/Card";

export default interface UseWriteTabProps {
  imgShapes: ImgShape[];
  isTextShapeSelected: boolean;
  selectedImgShapeCode: number | undefined;
  setTextShape: SetState<TextShape | undefined>;
  setImgShapes: SetState<ImgShape[]>;
  setSize: SetState<CardSizeType>;
  setSelectedIndex: SetState<number>;
}
