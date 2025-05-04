"use client";

import ContentCardSection from "@/widgets/content/ContentSection";
import { usePopupContents } from "../_hooks/getHotContents";
import { useExceptionHandler } from "@/shared/hooks/useExceptionHandler";
import { useEffect } from "react";
import Link from "next/link";
import { stackRouterPush } from "@/shared/helpers/stackRouter";
import { useRouter } from "next/navigation";
import { WEBVIEW_SCREEN } from "@/shared/consts/webview/screen";

const PopupSection = () => {
  const exceptionHandler = useExceptionHandler();
  const { data, error } = usePopupContents();
  const router = useRouter();

  // TODO: server side rendering 하도록 변경해야함.
  useEffect(() => {
    if (!error) return;

    exceptionHandler(error, [418, 429, 500, 502, 504]);
  }, [error]);

  return (
    <ContentCardSection contentList={data?.contentList}>
      새로 생긴
      <span className="text-skyblue-01"> #팝업스토어 </span> 둘러보기
      <Link
        className="absolute right-[24px] text-gray-500 text-body2"
        href={"/map"}
        onClick={(e) => {
          e.preventDefault();

          stackRouterPush(router, {
            path: `/search?genre=1`,
            screen: WEBVIEW_SCREEN.SEARCH,
          });
        }}
      >
        {"더보기 >"}
      </Link>
    </ContentCardSection>
  );
};

export default PopupSection;
