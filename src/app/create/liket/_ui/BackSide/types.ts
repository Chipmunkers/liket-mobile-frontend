import { ReviewEntity } from "@/shared/types/api/review/ReviewEntity";

export type Props = {
  reviewData: ReviewEntity;
  description: string;
  onClickReview: () => void;
};
