import ThumbIcon from "@/icons/thumb.svg";
import EmptyThumbIcon from "@/icons/empty-thumb.svg";
import { useEffect, useState } from "react";
import { useLikeReview } from "./hooks/useLikeReview";
import { useCancelLikeReview } from "./hooks/useCancelLikeReview";
import { AxiosError } from "axios";
import { Props } from "./types";

const LikeReviewButton = (props: Props) => {
  const [like, setLike] = useState(props.likeState);
  const [likeCount, setLikeCount] = useState(props.likeCount);

  useEffect(() => {
    setLike(props.likeState);
  }, [props.likeState]);

  const { mutate: likeReviewApi } = useLikeReview(
    props.idx,
    {
      onSuccess: () => {
        setLike(true);
        setLikeCount(likeCount + 1);
      },
    },
    setLike,
    setLikeCount
  );

  const { mutate: cancelLikeReviewApi } = useCancelLikeReview(
    props.idx,
    {
      onSuccess: () => {
        setLike(false);
        setLikeCount(likeCount - 1);
      },
    },
    setLike,
    setLikeCount
  );

  return (
    <>
      <button
        className="text-numbering2 text-skyblue-01 flex"
        onClick={(e) => {
          e.preventDefault();

          if (!like) {
            return likeReviewApi();
          }

          return cancelLikeReviewApi();
        }}
      >
        {like ? <ThumbIcon /> : <EmptyThumbIcon />}{" "}
        <span className="ml-[4px]">{likeCount}</span>
      </button>
    </>
  );
};

export default LikeReviewButton;
