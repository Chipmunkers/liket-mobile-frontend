"use client";

import InfiniteReviews from "@/app/create/liket/review-select/_ui/InfiniteReviews";
import { ReviewSmallSkeleton } from "@/entities/review/ReviewSmall";
import { WEBVIEW_SCREEN } from "@/shared/consts/webview/screen";
import { stackRouterBack, stackRouterPush } from "@/shared/helpers/stackRouter";
import { useGetMyInfo } from "@/shared/hooks/useGetMyInfo";
import useModalStore from "@/shared/store/modalStore";
import { Header, HeaderLeft, HeaderMiddle } from "@/shared/ui/Header";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter();
  const openModal = useModalStore(({ openModal }) => openModal);
  const { data, error } = useGetMyInfo();

  useEffect(() => {
    if (!error) return;

    const statusCode = error.response?.status;

    if (statusCode === 401) {
      openModal("LoginModal", {
        onClickPositive() {
          stackRouterPush(router, {
            path: "/login",
            screen: WEBVIEW_SCREEN.LOGIN,
            isStack: false,
          });
        },
        onClickNegative() {
          stackRouterBack(router);
        },
      });
      return;
    }

    stackRouterPush(router, {
      path: "/error",
      screen: WEBVIEW_SCREEN.ERROR,
      isStack: false,
    });
  }, [error]);

  return (
    <>
      <Header>
        <HeaderLeft option={{ back: true }} />
        <HeaderMiddle text="리뷰 선택" />
      </Header>
      <main>
        {data && <InfiniteReviews idx={data.idx} />}
        {!data &&
          Array(10)
            .fill(0)
            .map((elem, i) => (
              <div className="px-[24px]">
                <ReviewSmallSkeleton />
              </div>
            ))}
      </main>
    </>
  );
}
