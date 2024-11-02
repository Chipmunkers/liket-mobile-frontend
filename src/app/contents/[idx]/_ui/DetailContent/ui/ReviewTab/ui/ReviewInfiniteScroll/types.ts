import { ReviewEntity } from "@/shared/types/api/review/ReviewEntity";
import { UserEntity } from "@/shared/types/api/user/UserEntity";

export type Props = {
  reviewList: ReviewEntity[];
  loginUser?: UserEntity;
  setTarget: (target: HTMLDivElement | null) => void;
  onClickMeatball: (userIdxOfReview: number) => void;
};
