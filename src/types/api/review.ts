import { ContentEntity } from "./culture-content";
import { UserEntity } from "./user";

/**
 * @deprecated
 */
export interface ReviewEntity {
  idx: number;
  visitTime: string;
  thumbnail: string;
  cultureContent: Pick<
    ContentEntity,
    "idx" | "title" | "genre" | "likeCount" | "thumbnail"
  >;
  author: Pick<UserEntity, "idx" | "profileImgPath" | "nickname" | "provider">;
  createdAt: string;
  likeState: boolean;
  imgList: string[];
  description: string;
  starRating: number;
  likeCount: number;
}
