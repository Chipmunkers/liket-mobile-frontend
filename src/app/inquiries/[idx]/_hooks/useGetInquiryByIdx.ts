import { WEBVIEW_SCREEN } from "@/shared/consts/webview/screen";
import axiosInstance from "@/shared/helpers/axios";
import { stackRouterPush } from "@/shared/helpers/stackRouter";
import useModalStore from "@/shared/store/modalStore";
import { InquiryEntity } from "@/shared/types/api/inquiry/InquiryEntity";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const useGetInquiryByIdx = (idx: number) => {
  const openModal = useModalStore(({ openModal }) => openModal);
  const router = useRouter();

  const query = useQuery<InquiryEntity, AxiosError>({
    queryKey: [`inquiry-${idx}`],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/apis/inquiry/${idx}`);

      return data;
    },
  });

  useEffect(() => {
    if (!query.error) return;

    const statusCode = query.error.response?.status;

    if (statusCode === 404) return;

    if (statusCode === 401) {
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
      return;
    }

    stackRouterPush(router, {
      path: "/error",
      screen: WEBVIEW_SCREEN.ERROR,
    });
  }, [query.error]);

  return query;
};
