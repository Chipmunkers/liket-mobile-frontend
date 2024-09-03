import { ReviewEntity } from "@/shared/types/api/review/ReviewEntity";

export type Props = {
  reviewData: ReviewEntity;
  oneLineReview: string;
  onClickReview: () => void;
};
