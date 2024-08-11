"use client";

import BottomButtonTabWrapper from "@/components/BottomButtonTabWrapper";
import ButtonGroup from "@/components/ButtonGroup";
import ExclamationIcon from "@/icons/circle-exclamation.svg";
import NotFoundBottomButtons from "../components/NotFoundBottomButtons";

export default function ErrorPage() {
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
          <NotFoundBottomButtons />
        </ButtonGroup>
      </BottomButtonTabWrapper>
    </>
  );
}
