import { ReviewEntity } from "@/shared/types/api/review/ReviewEntity";
import { UserEntity } from "@/shared/types/api/user/UserEntity";

export type Props = {
  reviewList: ReviewEntity[];
  setIsReviewMenuDrawerOpen: (data: boolean) => void;
  setSelectReviewIdx: (idx: number) => void;
  loginUser?: UserEntity;
  setTarget: (target: HTMLDivElement | null) => void;
};
