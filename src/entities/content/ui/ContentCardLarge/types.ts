import { SummaryContentEntity } from "../../../../shared/types/api/content/SummaryContentEntity";
import { EntityUiProps } from "../../../../shared/types/react";

export type Props<
  T = Pick<
    SummaryContentEntity,
    | "idx"
    | "thumbnail"
    | "genre"
    | "likeState"
    | "title"
    | "location"
    | "startDate"
    | "endDate"
  >
> = EntityUiProps<{
  /**
   * 컨텐츠 정보
   */
  content: T;

  /**
   * 클릭 이벤트. 없을 경우 클릭이 되지 않음
   */
  onClick?: (content: T) => void;

  /**
   * 가로 넓이. 특수한 경우가 아니면 건드리지 않는 것을 추천
   *
   * @default 164px
   */
  width?: string;
}>;
