import { ReviewEntity } from "@/shared/types/api/review/ReviewEntity";

export type BackSideProps = {
  reviewData: Pick<ReviewEntity, "author" | "starRating" | "visitTime"> & {
    title: string;
    genre: string;
  };
  description: string;
  onClickReview: () => void;
};
