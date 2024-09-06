"use client";

import { useRouter } from "next/navigation";
import {
  Header,
  HeaderLeft,
  HeaderMiddle,
  HeaderRight,
} from "@/shared/ui/Header";
import { stackRouterPush } from "@/shared/helpers/stackRouter";
import { WEBVIEW_SCREEN } from "@/shared/consts/webview/screen";
import InquiryInfiniteGroup from "@/app/inquiries/_ui/InquiryInfiniteGroup";

export default function Page() {
  const router = useRouter();

  return (
    <>
      <Header>
        <HeaderLeft option={{ back: true }} />
        <HeaderMiddle text="문의 내역" />
        <HeaderRight
          option={{
            create: {
              onClick: () => {
                stackRouterPush(router, {
                  path: "/create/inquiry",
                  screen: WEBVIEW_SCREEN.CREATE_INQUIRY,
                });
              },
            },
          }}
        />
      </Header>
      <main className="pb-[24px]">
        <InquiryInfiniteGroup />
      </main>
    </>
  );
}
