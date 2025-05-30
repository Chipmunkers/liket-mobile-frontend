import { ContentEntity } from "@/shared/types/api/content/ContentEntity";
import { UserEntity } from "@/shared/types/api/user/UserEntity";

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
