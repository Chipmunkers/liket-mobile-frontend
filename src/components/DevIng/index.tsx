"use client";

import BottomButtonTabWrapper from "@/components/BottomButtonTabWrapper";
import ButtonGroup from "@/components/ButtonGroup";
import ExclamationIcon from "@/icons/circle-exclamation.svg";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";

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
      <BottomButtonTabWrapper>
        <ButtonGroup gap={8}>
          <Button
            variant="ghost"
            height={48}
            fullWidth
            onClick={() => {
              router.back();
            }}
          >
            이전 페이지
          </Button>
          <Button
            variant="primary"
            fullWidth
            height={48}
            onClick={() => {
              router.replace("/");
            }}
          >
            메인으로 가기
          </Button>
        </ButtonGroup>
      </BottomButtonTabWrapper>
    </>
  );
};

export default DevIng;
