"use client";

import ReviewLarge from "@/entities/review/ReviewLarge";
import { WEBVIEW_SCREEN } from "@/shared/consts/webview/screen";
import { stackRouterPush } from "@/shared/helpers/stackRouter";
import {
  Header,
  HeaderLeft,
  HeaderMiddle,
  HeaderRight,
} from "@/shared/ui/Header";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

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
        <div className="px-[24px]">
          <ReviewLarge />
        </div>
      </main>
    </>
  );
}
