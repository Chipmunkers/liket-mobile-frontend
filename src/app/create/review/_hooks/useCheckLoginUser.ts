import { useEffect } from "react";
import { useGetMyInfo } from "@/hooks/useGetMyInfo";
import useModalStore from "@/stores/modalStore";
import { ScreenTYPE, stackRouterPush } from "@/utils/stackRouter";
import { useRouter } from "next/navigation";

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
            screen: ScreenTYPE.LOGIN,
            isStack: false,
          });
        },
        onClickNegative: () => {
          stackRouterPush(router, {
            path: "/",
            screen: ScreenTYPE.MAIN,
            isStack: false,
          });
        },
      });
    }
  }, [error]);
};

export default useCheckLoginUser;
