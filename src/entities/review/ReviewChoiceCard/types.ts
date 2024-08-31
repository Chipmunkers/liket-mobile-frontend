import { ReviewEntity } from "@/shared/types/api/review/ReviewEntity";
import { EntityUiProps } from "@/shared/types/react";

type ReviewSmallReview = Pick<
  ReviewEntity,
  "idx" | "cultureContent" | "starRating" | "createdAt"
>;

export type Props = EntityUiProps<{
  review: ReviewSmallReview;

  /**
   * 상단 컨텐츠 영역 클릭 이벤트
   *
   * @default "아무 작동도 되지 않음"
   */
  onClickContents?: (review: ReviewSmallReview) => void;

  /**
   * 리뷰 전체 영역 클릭 이벤트
   *
   * @default "아무 작동도 되지 않음"
   */
  onClickReview?: (review: ReviewSmallReview) => void;
}>;
