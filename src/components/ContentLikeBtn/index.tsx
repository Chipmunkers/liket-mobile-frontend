"use client";

import { useState } from "react";
import { useCancelLikeContent, useLikeContent } from "../../apis/content";
import { AxiosError } from "axios";
import customToast from "../../utils/customToast";
import FilledLike from "@/icons/like-filled.svg";
import Like from "@/icons/like.svg";
import { colors } from "../../utils/style";

const ContentLikeBtn = (content: {
  likeState: boolean;
  idx: number | string;
  likeCount?: number;
}) => {
  const [like, setLike] = useState(content.likeState);
  const [likeCount, setLikeCount] = useState(content.likeCount || 0);

  const { mutate: likeContentApi } = useLikeContent(content.idx, {
    onSuccess: () => {
      setLike(true);
      setLikeCount(likeCount + 1);
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) return;
        if (err.response?.status === 404) return;
        if (err.response?.status === 409) return setLike(true);
      }
      customToast("예상하지 못한 에러가 발생했습니다. 다시 시도해주세요.");
    },
  });

  const { mutate: cancelLikeContentApi } = useCancelLikeContent(content.idx, {
    onSuccess: () => {
      setLike(false);
      setLikeCount(likeCount - 1);
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) return;
        if (err.response?.status === 409) return setLike(false);
        if (err.response?.status === 404) return;
      }
      customToast("예상하지 못한 에러가 발생했습니다. 다시 시도해주세요.");
    },
  });

  return (
    <button
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
      {content.likeCount !== undefined ? (
        <div className="text-skyblue-01 text-numbering2">{likeCount}</div>
      ) : null}
    </button>
  );
};

export default ContentLikeBtn;
