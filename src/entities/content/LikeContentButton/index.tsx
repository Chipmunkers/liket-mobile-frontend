"use client";

import { useEffect, useState } from "react";
import customToast from "@/utils/customToast";
import FilledHeartIcon from "@/shared/icon/content/FilledHeart.svg";
import EmptyHeaderIcon from "@/shared/icon/content/EmptyHeart.svg";
import { colors } from "@/utils/style";
import { useLikeContent } from "./hooks/useLikeContent";
import { useCancelLikeContent } from "./hooks/useCancelLikeContent";
import { Props } from "./types";

const LikeContentButton = (props: Props) => {
  const [like, setLike] = useState(props.likeState);
  const [likeCount, setLikeCount] = useState(props.likeCount || 0);

  useEffect(() => {
    setLike(props.likeState);
  }, [props.likeState]);

  const { mutate: likeContentApi } = useLikeContent(props.idx, {
    onSuccess: () => {
      setLike(true);
      setLikeCount(likeCount + 1);
    },
    onError: (err) => {
      if (err.response?.status === 401)
        return customToast("로그인 후 사용할 수 있는 서비스입니다.");
      if (err.response?.status === 404) return;
      if (err.response?.status === 409) return setLike(true);
      customToast("예상하지 못한 에러가 발생했습니다. 다시 시도해주세요.");
    },
  });

  const { mutate: cancelLikeContentApi } = useCancelLikeContent(props?.idx, {
    onSuccess: () => {
      setLike(false);
      setLikeCount(likeCount - 1);
    },
    onError: (err) => {
      if (err.response?.status === 401)
        return customToast("로그인 후 사용할 수 있는 서비스입니다.");
      if (err.response?.status === 404) return;
      if (err.response?.status === 409) return setLike(false);
      customToast("예상하지 못한 에러가 발생했습니다. 다시 시도해주세요.");
    },
  });

  return (
    <button
      className={`cursor-pointer ${props.className}`}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();

        if (!like) {
          return likeContentApi();
        }

        return cancelLikeContentApi();
      }}
    >
      {like ? (
        <FilledHeartIcon fill={colors["skyblue"]["01"]} />
      ) : (
        <EmptyHeaderIcon fill={colors["grey"]["02"]} />
      )}
      {props.likeCount !== undefined ? (
        <div className="text-skyblue-01 text-numbering2">{likeCount}</div>
      ) : null}
    </button>
  );
};

export default LikeContentButton;
