"use client";

import { useEffect, useState } from "react";
import { useLikeContent } from "./hooks/useLikeContent";
import { useCancelLikeContent } from "./hooks/useCancelLikeContent";
import { Props } from "./types";
import customToast from "@/shared/helpers/customToast";
import heartButtonAnimation from "@/shared/animation/heart-button.json";
import { hapticFeedback } from "@/shared/helpers/hapticFeedback";
import dynamic from "next/dynamic";

const Lottie = dynamic(
  () => import("react-lottie-player/dist/LottiePlayerLight"),
  { ssr: false }
);

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

        hapticFeedback({
          feedback: "select",
        });

        if (!like) {
          return likeContentApi();
        }

        return cancelLikeContentApi();
      }}
    >
      <div className="w-[24px] h-[24px] relative">
        <Lottie
          play={like}
          loop={false}
          speed={1.4}
          animationData={heartButtonAnimation}
          goTo={0}
          className="absolute w-[40px]"
          style={{
            right: "-7px",
            top: "-9px",
          }}
        />
      </div>

      {/* {like ? (
        <FilledHeartIcon fill={colors["skyblue"]["01"]} />
      ) : (
        <EmptyHeaderIcon fill={colors["grey"]["02"]} />
      )} */}
      {props.likeCount !== undefined ? (
        <div className="text-skyblue-01 text-numbering2">{likeCount}</div>
      ) : null}
    </button>
  );
};

export default LikeContentButton;
