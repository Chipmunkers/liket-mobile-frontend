import { Props } from "./types";
import ThumbIcon from "@/shared/icon/review/ThumbIcon.svg";
import ThumbFilledIcon from "@/shared/icon/review/ThumbFilledIcon.svg";
import { useState } from "react";
import { useLikeReview } from "./hooks/useLikeReview";
import { useCancelLikeReview } from "./hooks/useCancelLikeReview";

const ReviewLikeButton = ({
  likeState,
  likeCount: likeCountProps,
  idx,
  readonly = false,
}: Props) => {
  const [like, setLike] = useState(likeState);
  const [likeCount, setLikeCount] = useState(likeCountProps);

  const { mutate: likeReviewByIdx } = useLikeReview(
    idx,
    {
      onSuccess() {
        setLike(true);
        setLikeCount((count) => count + 1);
      },
    },
    setLike,
    setLikeCount
  );

  const { mutate: cancelToLikeReviewByIdx } = useCancelLikeReview(
    idx,
    {
      onSuccess() {
        setLike(false);
        setLikeCount((count) => count - 1);
      },
    },
    setLike,
    setLikeCount
  );

  return (
    <>
      <button
        className="text-skyblue-01 flex w-[48px] h-[48px]"
        onClick={(e) => {
          e.preventDefault();

          if (readonly) return;

          if (!like) {
            return likeReviewByIdx();
          }

          return cancelToLikeReviewByIdx();
        }}
      >
        {like ? (
          <ThumbIcon className="mt-[16px] ml-[9px]" />
        ) : (
          <ThumbFilledIcon className="mt-[16px] ml-[9px]" />
        )}{" "}
        <span className="text-numbering2 ml-[4px] mt-[18px]">{23}</span>
      </button>
    </>
  );
};

export default ReviewLikeButton;
