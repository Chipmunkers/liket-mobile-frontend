"use client";

import ExclamationIcon from "@/icons/circle-exclamation.svg";
import { useRouter } from "next/navigation";
import BottomButtonTab from "@/shared/ui/BottomButtonTab";
import Button from "@/shared/ui/Button";
import { stackRouterBack, stackRouterPush } from "@/shared/helpers/stackRouter";
import { WEBVIEW_SCREEN } from "@/shared/consts/webview/screen";

export default function Page() {
  const router = useRouter();

  return (
    <>
      <main className="center">
        <ExclamationIcon
          style={{
            margin: "0 0 48px 0",
          }}
        />
        <div className="text-h1 mb-[16px]">페이지를 찾을 수 없습니다</div>
        <div className="text-center text-body3 text-grey-04">
          <div>주소가 잘못 입력되거나</div>
          <div>변경 혹은 삭제되어 페이지를 찾을 수 없습니다.</div>
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
