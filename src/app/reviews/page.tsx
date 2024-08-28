"use client";

import ReviewInfinite from "./_ui/ReviewInfinite";
import { WEBVIEW_SCREEN } from "@/shared/consts/webview/screen";
import { stackRouterPush } from "@/shared/helpers/stackRouter";
import {
  Header,
  HeaderLeft,
  HeaderMiddle,
  HeaderRight,
} from "@/shared/ui/Header";
import { useRouter, useSearchParams } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const searchParam = useSearchParams();

  const userIdx = searchParam.get("user");

  if (!userIdx || isNaN(Number(userIdx))) {
    // TODO: 잘못된 접근입니다 페이지로 이동시켜야함
    stackRouterPush(router, {
      path: "/error",
      screen: WEBVIEW_SCREEN.ERROR,
      isStack: false,
    });
    return;
  }

  return (
    <>
      <Header>
        <HeaderLeft option={{ back: true }} />
        <HeaderMiddle text="나의 리뷰" />
        <HeaderRight
          option={{
            create: {
              onClick() {
                stackRouterPush(router, {
                  path: "/create/review",
                  screen: WEBVIEW_SCREEN.CREATE_REVIEW,
                });
              },
            },
          }}
        />
      </Header>
      <main>
        <ReviewInfinite idx={Number(userIdx)} />
      </main>
    </>
  );
}
