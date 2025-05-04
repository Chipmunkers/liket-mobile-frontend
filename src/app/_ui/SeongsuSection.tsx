"use client";

import ContentCardSection from "@/widgets/content/ContentSection";
import { useSeongsuContents } from "../_hooks/getHotContents";
import { useExceptionHandler } from "@/shared/hooks/useExceptionHandler";
import { useEffect } from "react";
import Link from "next/link";
import { stackRouterPush } from "@/shared/helpers/stackRouter";
import { useRouter } from "next/navigation";
import { WEBVIEW_SCREEN } from "@/shared/consts/webview/screen";

const SeongsuSection = () => {
  const exceptionHandler = useExceptionHandler();
  const { data, error } = useSeongsuContents();
  const router = useRouter();

  useEffect(() => {
    if (!error) return;

    exceptionHandler(error, [418, 429, 500, 502, 504]);
  }, [error]);

  return (
    <ContentCardSection contentList={data?.contentList}>
      요즘 뜨는
      <span className="text-skyblue-01"> #성수동 </span> 놀거리 ✨
      <Link
        className="absolute right-[24px] text-gray-500 text-body2"
        href={"/map"}
        onClick={(e) => {
          e.preventDefault();

          stackRouterPush(router, {
            path: `/map?lat=${37.55102968913442}&lng=${127.06105853332118}`,
            moveScreen: false,
            screen: WEBVIEW_SCREEN.MAIN,
          });
        }}
      >
        {"더보기 >"}
      </Link>
    </ContentCardSection>
  );
};

export default SeongsuSection;
