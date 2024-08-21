import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGetMyInfo } from "@/shared/hooks/useGetMyInfo";
import { stackRouterPush } from "@/shared/helpers/stackRouter";
import { WEBVIEW_SCREEN } from "@/shared/consts/webview/screen";
import useModalStore from "@/shared/store/modalStore";

const useCheckLoginUser = () => {
  const openModal = useModalStore(({ openModal }) => openModal);
  const router = useRouter();

  const { error } = useGetMyInfo();

  useEffect(() => {
    if (!error) return;

    if (error.response?.status === 401) {
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
    }
  }, [error]);
};

export default useCheckLoginUser;
