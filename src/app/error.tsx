"use client";

import BottomButtonTabWrapper from "@/components/BottomButtonTabWrapper";
import ButtonGroup from "@/components/ButtonGroup";
import ExclamationIcon from "@/icons/circle-exclamation.svg";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import {
  ScreenTYPE,
  stackRouterBack,
  stackRouterPush,
} from "../utils/stackRouter";

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
        <div className="text-h1 mb-[16px]">네트워크 연결이 끊겼습니다.</div>
        <div className="text-center text-body3 text-grey-04">
          <div>네트워크 연결 상태 확인 후</div>
          <div>다시 시도해주세요</div>
        </div>
      </main>
      <BottomButtonTabWrapper>
        <ButtonGroup gap={8}>
          <Button
            variant="ghost"
            height={48}
            fullWidth
            onClick={() => stackRouterBack(router)}
          >
            이전 페이지
          </Button>
          <Button
            variant="primary"
            fullWidth
            height={48}
            onClick={() =>
              stackRouterPush(router, {
                path: "/",
                screen: ScreenTYPE.MAIN,
                isStack: false,
              })
            }
          >
            메인으로 가기
          </Button>
        </ButtonGroup>
      </BottomButtonTabWrapper>
    </>
  );
}
