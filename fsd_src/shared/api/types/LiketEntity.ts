import { BgImgInfo, ImgShape, TextShape } from "../../type/liket";

export interface LiketDetailEntity {
  idx: string;
  size: 1 | 2 | 3;
  cardImgPath: string;
  textShape: TextShape | undefined;
  imgShapes: ImgShape[];
  bgImgPath: string;
  bgImgInfo: BgImgInfo;
  cultureContent: {
    idx: string;
    title: string;
    location: {
      detailAddress?: string;
      address: string;
      region1Depth: string;
      region2Depth: string;
      positionX: number;
      positionY: number;
      hCode: string;
      bCode: string;
    };
    genre: {
      idx: string;
      name: string;
    };
  };
  review: {
    visitTime: string;
    starRating: number;
  };
  author: {
    idx: string;
    profileImgPath: string;
    nickname: string;
    provider: string;
  };
  description: string;
  createdAt: string;
}
