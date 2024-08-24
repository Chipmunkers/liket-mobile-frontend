import { ContentEntity } from "@/shared/types/api/content/ContentEntity";
import { EntityUiProps } from "@/shared/types/react";

type ContentCardSmallContent = Pick<
  ContentEntity,
  "idx" | "genre" | "title" | "thumbnail" | "createdAt" | "acceptedAt"
>;

export type Props = EntityUiProps<{
  /**
   * 컨텐츠 데이터
   */
  content: ContentCardSmallContent;

  /**
   * 컨텐츠 클릭 이벤트
   *
   * @default "요청 컨텐츠 자세히보기 페이지로 이동"
   */
  onClick?: (content: ContentCardSmallContent) => void;

  /**
   * border bottom 여부
   *
   * @default true
   */
  borderBottom?: boolean;
}>;
