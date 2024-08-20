import { ContentEntity } from "./ContentEntity";

export interface SummaryContentEntity
  extends Pick<
    ContentEntity,
    | "idx"
    | "title"
    | "thumbnail"
    | "genre"
    | "style"
    | "location"
    | "startDate"
    | "endDate"
    | "likeState"
    | "createdAt"
    | "acceptedAt"
  > {}
