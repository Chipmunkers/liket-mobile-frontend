"use client";

import ExclamationIcon from "@/icons/circle-exclamation.svg";
import { useRouter } from "next/navigation";
import BottomButtonTab from "@/shared/ui/BottomButtonTab";
import Button from "@/shared/ui/Button";
import { stackRouterBack, stackRouterPush } from "@/shared/helpers/stackRouter";
import { WEBVIEW_SCREEN } from "@/shared/consts/webview/screen";

export default function ErrorPage() {
  const router = useRouter();

  return (
    <>
      <main className="center">
        <ExclamationIcon
          style={{
            margin: "0 0 48px 0",
          }}
        />
        <div className="text-h1 mb-[16px]">네트워크 연결이 끊겼습니다.</div>
        <div className="text-center text-body3 text-grey-04">
          <div>네트워크 연결 상태 확인 후</div>
          <div>다시 시도해주세요</div>
        </div>
      </main>
      <BottomButtonTab>
        <Button
          variant="ghost"
          className="flex-1 h-[48px] mr-[16px]"
          onClick={() => stackRouterBack(router)}
        >
          이전 페이지
        </Button>
        <Button
          variant="primary"
          className="flex-1 h-[48px]"
          onClick={() =>
            stackRouterPush(router, {
              path: "/",
              screen: WEBVIEW_SCREEN.MAIN,
              isStack: false,
            })
          }
        >
          메인으로 가기
        </Button>
      </BottomButtonTab>
    </>
  );
}
