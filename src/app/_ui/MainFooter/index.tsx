"use client";

import { WEBVIEW_SCREEN } from "@/shared/consts/webview/screen";
import { useGetSafeArea } from "@/shared/hooks/useGetSafeArea";
import { DefaultLink } from "@/shared/ui/DefaultLink";
import Divider from "@/shared/ui/Divider";

export const MainFooter = () => {
  const { safeArea } = useGetSafeArea();

  return (
    <footer
      className="flex flex-col mb-[24px]"
      style={{
        paddingBottom: safeArea.bottom + "px",
      }}
    >
      <header className="pl-[25px] flex gap-[16px] text-button5 text-grey-04 items-center py-[8px]">
        <DefaultLink
          href="/terms/3"
          routerOption={{
            path: "/terms/3",
            screen: WEBVIEW_SCREEN.TERMS_DETAIL,
          }}
        >
          청소년보호정책
        </DefaultLink>
        <div className="w-[1px] h-[8px] bg-grey-02"></div>
        <DefaultLink
          href="/terms/1"
          routerOption={{
            path: "/terms/1",
            screen: WEBVIEW_SCREEN.TERMS_DETAIL,
          }}
        >
          이용약관
        </DefaultLink>
        <div className="w-[1px] h-[8px] bg-grey-02"></div>
        <DefaultLink
          href="/terms/2"
          routerOption={{
            path: "/terms/1",
            screen: WEBVIEW_SCREEN.TERMS_DETAIL,
          }}
        >
          개인정보처리방침
        </DefaultLink>
      </header>
      <Divider width="100%" height="2px" />
      <span className="ml-[24px] text-body5 mt-[8px] mb-[4px] text-grey-04">
        Copyright © 2025 LIKET Corp. All Rights Reserved.
      </span>
      <Divider width="100%" height="2px" />
      <main className="ml-[24px] mt-[8px]">
        <h2 className="text-grey-04 text-body4">라이켓 사업자 정보</h2>
        <p className="mt-[8px] text-grey-04 text-body5">
          사업자 번호 000-00-00000
        </p>
        <p className="mt-[4px] text-grey-04 text-body5">
          문의 메일: liket.service@gmail.com
        </p>
      </main>
    </footer>
  );
};
