"use client";

import ExclamationIcon from "@/icons/circle-exclamation.svg";
import { useRouter } from "next/navigation";
import { stackRouterBack, stackRouterPush } from "@/shared/helpers/stackRouter";
import { WEBVIEW_SCREEN } from "@/shared/consts/webview/screen";
import BottomButtonTab from "@/shared/ui/BottomButtonTab";
import Button from "@/shared/ui/Button";

/**
 * 레이아웃이 피그마를 완전히 반영하지 않음. Error widget 사용하도록
 *
 * @deprecated
 */
const DevIng = () => {
  const router = useRouter();

  return (
    <>
      <main className="center">
        <ExclamationIcon
          style={{
            margin: "0 0 48px 0",
          }}
        />
        <div className="text-h1 mb-[16px]">개발중입니다.</div>
        <div className="text-center text-body3 text-grey-04">
          <div>현재 페이지는 준비중입니다.</div>
          <div>빠른 시일내로 업데이트 하도록 하겠습니다.</div>
        </div>
      </main>
      <BottomButtonTab>
        <Button
          className="flex-1 h-[48px] mr-[8px]"
          variant="ghost"
          onClick={() => {
            stackRouterBack(router);
          }}
        >
          이전 페이지
        </Button>
        <Button
          className="flex-1 h-[48px]"
          variant="primary"
          onClick={() => {
            stackRouterPush(router, {
              path: "/",
              screen: WEBVIEW_SCREEN.MAIN,
              isStack: false,
            });
          }}
        >
          메인으로 가기
        </Button>
      </BottomButtonTab>
    </>
  );
};

export default DevIng;
