import {
  BgImgInfo,
  ImgShape,
  TextShape,
} from "../../../../../shared/types/liket/card";

export interface CreateLiketDto {
  textShape?: TextShape;
  imgShapes?: ImgShape[];
  size: 1 | 2 | 3;
  bgImgInfo: BgImgInfo;
  bgImgPath: string;
  cardImgPath: string;
  description: string;
}
