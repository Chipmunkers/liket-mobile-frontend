import { BgImgInfo, CardSizeType, ImgShape, TextShape } from "../../types";
import Konva from "konva";
import { Dispatch, RefObject, SetStateAction } from "react";

export type Props = {
  uploadedImage: HTMLImageElement | undefined;
  imgShapes: ImgShape[];
  textShape: TextShape | undefined;
  stageRef: RefObject<Konva.Stage>;
  isTextShapeSelected: boolean;
  size: CardSizeType;
  selectedImgShapeCode: number | undefined;
  bgImgInfo: BgImgInfo | undefined;
  onSelectImgShape: (code?: number) => void;
  onSelectTextShape: (isSelected: boolean) => void;
  onChangeImgShapes: (imgShapes: ImgShape[]) => void;
  onChangeTextShape: (textShape: TextShape) => void;
  onUploadImage: (dataUrl: HTMLImageElement) => void;
  onChangeBackgroundImage: (bgImgInfo: BgImgInfo) => void;
  onUploadSuccessBgImg: Dispatch<SetStateAction<string>>;
  selectedIndex: number;
};
