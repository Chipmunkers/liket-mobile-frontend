"use client";

import { WEBVIEW_SCREEN } from "@/shared/consts/webview/screen";
import { stackRouterPush } from "@/shared/helpers/stackRouter";
import { useGetSafeArea } from "@/shared/hooks/useGetSafeArea";
import Divider from "@/shared/ui/Divider";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const MainFooter = () => {
  const { safeArea } = useGetSafeArea();
  const router = useRouter();

  const linkClickEvent =
    (termsIdx: number): React.MouseEventHandler<HTMLAnchorElement> =>
    (e) => {
      e.preventDefault();
      stackRouterPush(router, {
        path: `/terms/${termsIdx}`,
        screen: WEBVIEW_SCREEN.TERMS_DETAIL,
      });
    };

  return (
    <footer
      className="flex flex-col mb-[24px]"
      style={{
        paddingBottom: safeArea.bottom + "px",
      }}
    >
      <header className="pl-[25px] flex gap-[16px] text-button5 text-grey-04 items-center py-[8px]">
        <Link href={"/terms/3"} onClick={linkClickEvent(3)}>
          청소년보호정책
        </Link>
        <div className="w-[1px] h-[8px] bg-grey-02"></div>
        <Link href={"/terms/1"} onClick={linkClickEvent(1)}>
          이용약관
        </Link>
        <div className="w-[1px] h-[8px] bg-grey-02"></div>
        <Link href={"/terms/2"} onClick={linkClickEvent(2)}>
          개인정보처리방침
        </Link>
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
