import { SummaryContentEntity } from "@/shared/types/api/content/SummaryContentEntity";
import { EntityUiProps } from "@/shared/types/react";

export type Props = EntityUiProps<{
  content: Pick<
    SummaryContentEntity,
    | "idx"
    | "thumbnail"
    | "location"
    | "startDate"
    | "endDate"
    | "genre"
    | "likeState"
    | "title"
  >;

  /**
   * 컨텐츠 카드 클릭 이벤트. 없을 경우 컨텐츠 자세히보기로 이동
   */
  onClick?: () => void;
}>;
