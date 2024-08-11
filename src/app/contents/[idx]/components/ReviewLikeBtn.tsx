import ThumbIcon from "@/icons/thumb.svg";
import EmptyThumbIcon from "@/icons/empty-thumb.svg";
import { useEffect, useState } from "react";
import { useLikeReview } from "../hooks/useLikeReview";
import { useCancelLikeReview } from "../hooks/useCancelLikeReview";
import { AxiosError } from "axios";
import customToast from "../../../../utils/customToast";

const ReviewLikeBtn = (props: {
  likeState: boolean;
  likeCount: number;
  idx: number;
}) => {
  const [like, setLike] = useState(props.likeState);
  const [likeCount, setLikeCount] = useState(props.likeCount);

  useEffect(() => {
    setLike(props.likeState);
  }, [props.likeState]);

  const { mutate: likeReviewApi } = useLikeReview(props.idx, {
    onSuccess: () => {
      setLike(true);
      setLikeCount(likeCount + 1);
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401)
          return customToast("로그인 후 사용할 수 있는 서비스입니다.");
        if (err.response?.status === 404) return;
        if (err.response?.status === 409) return setLike(true);
      }
      customToast("예상하지 못한 에러가 발생했습니다. 다시 시도해주세요.");
    },
  });
  const { mutate: cancelLikeReviewApi } = useCancelLikeReview(props.idx, {
    onSuccess: () => {
      setLike(false);
      setLikeCount(likeCount - 1);
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401)
          return customToast("로그인 후 사용할 수 있는 서비스입니다.");
        if (err.response?.status === 404) return;
        if (err.response?.status === 409) return setLike(false);
      }
      customToast("예상하지 못한 에러가 발생했습니다. 다시 시도해주세요.");
    },
  });

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

export default ReviewLikeBtn;
