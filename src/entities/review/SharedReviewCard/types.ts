import { ReviewEntity } from "@/shared/types/api/review/ReviewEntity";
import { EntityUiProps } from "@/shared/types/react";

type SharedReviewCardReview = Pick<
  ReviewEntity,
  | "idx"
  | "author"
  | "createdAt"
  | "likeCount"
  | "likeState"
  | "starRating"
  | "imgList"
  | "description"
>;

export type Props = EntityUiProps<{
  review: SharedReviewCardReview;

  /**
   * 리뷰 클릭 이벤트
   *
   * @default "아무 작동도 되지 않음"
   */
  onClick?: (review: SharedReviewCardReview) => {};

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
  onClickMeatball?: (review: SharedReviewCardReview) => void;

  /**
   * 좋아요 버튼 여부
   *
   * @default false
   */
  likeButton?: boolean;
}>;
