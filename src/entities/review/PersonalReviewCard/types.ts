import { ReviewEntity } from "@/shared/types/api/review/ReviewEntity";
import { EntityUiProps } from "@/shared/types/react";

type ReviewLargeReview = Pick<
  ReviewEntity,
  | "idx"
  | "cultureContent"
  | "imgList"
  | "starRating"
  | "createdAt"
  | "description"
  | "likeState"
  | "likeCount"
>;

export type Props = EntityUiProps<{
  review: ReviewLargeReview;

  /**
   * 상단 컨텐츠 영역 클릭 이벤트
   *
   * @default "아무 작동도 되지 않음"
   */
  onClickContents?: (review: ReviewLargeReview) => void;

  /**
   * 미트볼 버튼 여부
   *
   * @default true
   */
  meatballButton?: boolean;

  /**
   * 미트볼 버튼 클릭 이벤트
   *
   * @default "아무 작동도 되지 않음"
   */
  onClickMeatball?: (review: ReviewLargeReview) => void;

  /**
   * 좋아요 버튼 여부
   *
   * @default false
   */
  likeButton?: boolean;

  /**
   * 리뷰 description 3줄만 표시할지 여부
   *
   * @default true
   */
  descriptionClamp?: boolean;
}>;
