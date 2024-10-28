import { Props } from "./types";
import ThumbIcon from "@/shared/icon/review/ThumbIcon.svg";
import ThumbFilledIcon from "@/shared/icon/review/ThumbFilledIcon.svg";
import { useState } from "react";
import { useLikeReview } from "./hooks/useLikeReview";
import { useCancelLikeReview } from "./hooks/useCancelLikeReview";
import { classNames } from "@/shared/helpers/classNames";

const ReviewLikeButton = ({
  likeState,
  likeCount: likeCountProps,
  idx,
  readonly = false,
  className = "",
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
        className={classNames("text-skyblue-01 flex", className)}
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
        <span className="text-numbering2 ml-[4px] mt-[18px]">{likeCount}</span>
      </button>
    </>
  );
};

export default ReviewLikeButton;
