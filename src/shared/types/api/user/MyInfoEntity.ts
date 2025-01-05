import { LiketEntity } from "@/shared/types/api/liket/LiketEntity";
import { ReviewEntity } from "@/shared/types/api/review/ReviewEntity";

export interface MyInfoEntity {
  reviewCount: number;
  reviewList: Pick<ReviewEntity, "idx" | "thumbnail" | "cultureContent">[];
  liketCount: number;
  liketList: Pick<LiketEntity, "idx" | "cardImgPath">[];
  idx: string;
  profileImgPath: string;
  nickname: string;
  provider: string;
  gender: number | null;
  email: string;
  birth: number | null;
  likeCount: number;
  createdAt: string;
}
