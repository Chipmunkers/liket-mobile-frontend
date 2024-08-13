"use client";

import BottomButtonTabWrapper from "@/components/BottomButtonTabWrapper";
import ButtonGroup from "@/components/ButtonGroup";
import ExclamationIcon from "@/icons/circle-exclamation.svg";
import { useRouter } from "next/navigation";
import { variantToStyleMap } from "../utils/style";
import { classNames } from "../utils/helpers";

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
      <BottomButtonTabWrapper>
        <ButtonGroup gap={8}>
          <button
            type={"button"}
            className={classNames(
              "center text-button1 rounded-[28px] h-[48px] flex-1",
              variantToStyleMap["ghost"]
            )}
            onClick={() => router.back()}
          >
            이전 페이지
          </button>
          <button
            type={"button"}
            className={classNames(
              "center text-button1 rounded-[28px] h-[48px] flex-1",
              variantToStyleMap["primary"]
            )}
            onClick={() => router.replace("/")}
          >
            메인으로 가기
          </button>
          {/* // ! not found 페이지 BaseButton 버그 존재 */}
          {/* <Button
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
          </Button> */}
        </ButtonGroup>
      </BottomButtonTabWrapper>
    </>
  );
}
