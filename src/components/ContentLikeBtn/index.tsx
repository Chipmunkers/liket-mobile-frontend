"use client";

import { useState } from "react";
import { useCancelLikeContent, useLikeContent } from "../../apis/content";
import { AxiosError } from "axios";
import customToast from "../../utils/customToast";
import FilledLike from "@/icons/like-filled.svg";
import Like from "@/icons/like.svg";
import { colors } from "../../utils/style";

const ContentLikeBtn = (props: {
  likeState: boolean;
  idx: number | string;
  likeCount?: number;
  className?: string;
}) => {
  const [like, setLike] = useState(props.likeState);
  const [likeCount, setLikeCount] = useState(props.likeCount || 0);

  const { mutate: likeContentApi } = useLikeContent(props.idx, {
    onSuccess: () => {
      setLike(true);
      setLikeCount(likeCount + 1);
    },
    onError: (err) => {
      console.log("좋아요 에러 발생");
      if (err instanceof AxiosError) {
        if (err.response?.status === 401)
          return customToast("로그인 후 사용할 수 있는 서비스입니다.");
        if (err.response?.status === 404) return;
        if (err.response?.status === 409) return setLike(true);
      }
      customToast("예상하지 못한 에러가 발생했습니다. 다시 시도해주세요.");
    },
  });

  const { mutate: cancelLikeContentApi } = useCancelLikeContent(props.idx, {
    onSuccess: () => {
      setLike(false);
      setLikeCount(likeCount - 1);
    },
    onError: (err) => {
      console.log("좋아요 췩소 에러 발생");
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
    <button
      className={`cursor-pointer ${props.className}`}
      onClick={(e) => {
        e.preventDefault();

        if (!like) {
          return likeContentApi();
        }

        return cancelLikeContentApi();
      }}
    >
      {like ? (
        <FilledLike fill={colors["skyblue"]["01"]} />
      ) : (
        <Like fill={colors["grey"]["02"]} />
      )}
      {props.likeCount !== undefined ? (
        <div className="text-skyblue-01 text-numbering2">{likeCount}</div>
      ) : null}
    </button>
  );
};

export default ContentLikeBtn;
