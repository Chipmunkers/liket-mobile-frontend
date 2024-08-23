import { ContentEntity } from "@/shared/types/api/content/ContentEntity";

export interface MapContentEntity
  extends Pick<
    ContentEntity,
    | "idx"
    | "title"
    | "genre"
    | "startDate"
    | "endDate"
    | "location"
    | "likeState"
    | "imgList"
  > {}
