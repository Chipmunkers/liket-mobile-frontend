import { SummaryContentEntity } from "@/shared/types/api/content/SummaryContentEntity";

export type Props = {
  contentList: Pick<
    SummaryContentEntity,
    | "idx"
    | "thumbnail"
    | "location"
    | "startDate"
    | "endDate"
    | "genre"
    | "likeState"
    | "title"
  >[];
};
