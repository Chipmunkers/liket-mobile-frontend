"use client";

import Link from "next/link";
import ArrowIcon from "./icon/review-arrow.svg";
import { useRouter } from "next/navigation";
import { stackRouterPush } from "@/shared/helpers/stackRouter";
import { WEBVIEW_SCREEN } from "@/shared/consts/webview/screen";
import { Props } from "./types";

const EmptyReview = (props: Props) => {
  const router = useRouter();

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col w-[200px] items-center mt-[24px]">
        <p className="text-grey-04 text-body3">작성된 리뷰가 없습니다.</p>
        <p className="text-grey-04 text-body3">첫번째로 리뷰를 남겨보세요!</p>
      </div>
      <Link
        href={`/create/review?content=${props.idx}`}
        className="h-[18px] mt-[18px] flex items-center"
        onClick={(e) => {
          e.preventDefault();

          stackRouterPush(router, {
            path: `/create/review?content=${props.idx}`,
            screen: WEBVIEW_SCREEN.CREATE_REVIEW,
          });
        }}
      >
        <p className="text-body5 text-grey-02">리뷰 작성하러가기</p>
        <ArrowIcon />
      </Link>
    </div>
  );
};

export default EmptyReview;
