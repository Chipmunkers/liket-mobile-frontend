import { LiketEntity } from "@/shared/types/api/liket/LiketEntity";
import { ReviewEntity } from "@/shared/types/api/review/ReviewEntity";

export interface MyInfoEntity {
  reviewCount: number;
  reviewList: Pick<ReviewEntity, "idx" | "thumbnail">[];
  liketCount: number;
  liketList: Pick<LiketEntity, "idx" | "imgPath">[];
  idx: number;
  profileImgPath: string;
  nickname: string;
  provider: string;
  gender: number;
  email: string;
  birth: number;
  likeCount: number;
  createdAt: string;
}
