import { ContentEntity } from "./culture-content";

export interface ClusteredContentEntity {
  code: string;
  lng: number;
  lat: number;
  count: number;
}

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
