import {
  BgImgInfo,
  ImgShape,
  TextShape,
} from "../../../../shared/types/liket/card";
import { ReviewEntity } from "../../../../shared/types/review_entity/Review";
import { CreateLiketDto } from "../../models/types.tsx/dto/CreateLiketDto";

export default interface CreateLiketTemplateProps {
  liketInformation: FrontInformation;
  reviewData: Pick<ReviewEntity, "author" | "starRating" | "visitTime"> & {
    title: string;
    genre: string;
  };
  onSave: (payload: CreateLiketDto) => void;
}

interface FrontInformation {
  bgImgPath: string;
  bgImgInfo?: BgImgInfo;
  imgShapes: ImgShape[];
  textShape?: TextShape | undefined;
  size: 1 | 2 | 3;
  description: string;
}
