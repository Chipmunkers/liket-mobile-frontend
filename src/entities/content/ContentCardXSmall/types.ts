import { ContentEntity } from "@/shared/types/api/content/ContentEntity";
import { EntityUiProps } from "@/shared/types/react";

type ContentCardXSmallContent = Pick<
  ContentEntity,
  "idx" | "title" | "thumbnail" | "startDate" | "endDate"
>;

export type Props = EntityUiProps<{
  /**
   * 컨텐츠 데이터
   */
  content: ContentCardXSmallContent;

  /**
   * 컨텐츠 카드 클릭 이벤트
   *
   * @default "해당 컨텐츠 자세히보기 페이지로 이동"
   */
  onClick?: (content: ContentCardXSmallContent) => void;
}>;
