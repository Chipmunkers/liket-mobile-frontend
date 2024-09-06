"use client";

import ExclamationIcon from "@/icons/circle-exclamation.svg";
import { useRouter } from "next/navigation";
import BottomButtonTab from "@/shared/ui/BottomButtonTab";
import Button from "@/shared/ui/Button";
import { stackRouterBack, stackRouterPush } from "@/shared/helpers/stackRouter";
import { WEBVIEW_SCREEN } from "@/shared/consts/webview/screen";
import { Props } from "./types";
import { classNames } from "@/shared/helpers/classNames";
import { useGetSafeArea } from "@/shared/hooks/useGetSafeArea";

const CustomError = ({
  title,
  text1,
  text2,
  leftButtonText = "이전 페이지",
  rightButtonText = "메인으로 가기",
  leftButtonOnClick,
  rightButtonOnClick,
  className = "",
}: Props) => {
  const router = useRouter();
  const { safeArea } = useGetSafeArea();

  return (
    <>
      <main className={classNames("center", className)}>
        <ExclamationIcon
          style={{
            margin: "0 0 48px 0",
          }}
        />
        <div className="text-h1 mb-[16px]">{title}</div>
        <div className="text-center text-body3 text-grey-04">
          <div>{text1}</div>
          <div>{text2}</div>
        </div>
      </main>
      <div className="absolute" style={{ paddingBottom: "200px" }}>
        <BottomButtonTab>
          <Button
            variant="ghost"
            className="flex-1 h-[48px] mr-[16px]"
            style={{
              marginBottom: safeArea.bottom + "px",
            }}
            onClick={() => {
              if (leftButtonOnClick) {
                leftButtonOnClick();
                return;
              }

              stackRouterBack(router);
            }}
          >
            {leftButtonText}
          </Button>
          <Button
            variant="primary"
            className="flex-1 h-[48px]"
            style={{
              marginBottom: safeArea.bottom + "px",
            }}
            onClick={() => {
              if (rightButtonOnClick) {
                rightButtonOnClick();
                return;
              }

              stackRouterPush(router, {
                path: "/",
                screen: WEBVIEW_SCREEN.MAIN,
                isStack: false,
              });
            }}
          >
            {rightButtonText}
          </Button>
        </BottomButtonTab>
      </div>
    </>
  );
};

export default CustomError;
