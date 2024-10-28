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

  /**
   * 열린채로 둘 것인지 여부
   *
   * @default false
   */
  open?: boolean;

  /**
   * 바텀시트
   */
  title?: string;
};
