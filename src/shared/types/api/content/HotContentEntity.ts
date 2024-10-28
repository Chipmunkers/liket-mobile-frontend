import { GenreEntity } from "../tag/GenreEntity";
import { ContentEntity } from "./ContentEntity";

export interface HotContentEntity extends GenreEntity {
  contentList: Pick<
    ContentEntity,
    "idx" | "title" | "startDate" | "endDate" | "thumbnail"
  >[];
}
