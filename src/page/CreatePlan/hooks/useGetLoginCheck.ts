import { WEBVIEW_SCREEN } from "@/shared/consts/webview/screen";
import { stackRouterPush } from "@/shared/helpers/stackRouter";
import { useExceptionHandler } from "@/shared/hooks/useExceptionHandler";
import { useGetMyInfo } from "@/shared/hooks/useGetMyInfo";
import useModalStore from "@/shared/store/modalStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const useGetLoginCheck = () => {
  const { error } = useGetMyInfo();
  const exceptionHandler = useExceptionHandler();
  const openModal = useModalStore(({ openModal }) => openModal);
  const router = useRouter();

  useEffect(() => {
    if (!error) return;

    exceptionHandler(error, [
      {
        statusCode: 401,
        handler() {
          openModal("LoginModal", {
            onClickPositive: () => {
              stackRouterPush(router, {
                path: "/login",
                screen: WEBVIEW_SCREEN.LOGIN,
                isStack: false,
              });
            },
            onClickNegative: () => {
              stackRouterPush(router, {
                path: "/",
                screen: WEBVIEW_SCREEN.MAIN,
                isStack: false,
              });
            },
          });
        },
      },
      500,
      502,
      504,
    ]);
  }, [error]);
};
