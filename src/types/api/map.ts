import { ContentEntity } from "./culture-content";

/**
 * @deprecated
 */
export interface ClusteredContentEntity {
  code: string;
  lng: number;
  lat: number;
  count: number;
}

/**
 * @deprecated
 */
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
