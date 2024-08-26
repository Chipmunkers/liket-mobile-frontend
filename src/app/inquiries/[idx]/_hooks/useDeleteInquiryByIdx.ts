import { WEBVIEW_SCREEN } from "@/shared/consts/webview/screen";
import axiosInstance from "@/shared/helpers/axios";
import customToast from "@/shared/helpers/customToast";
import { stackRouterPush } from "@/shared/helpers/stackRouter";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

export const useDeleteInquiryByIdx = () => {
  const router = useRouter();

  return useMutation<unknown, AxiosError, number>({
    mutationFn: async (idx: number) => {
      await axiosInstance.delete(`/apis/inquiry/${idx}`);
    },
    onError(err) {
      const statusCode = err.response?.status;

      if (statusCode === 401) {
        stackRouterPush(router, {
          path: "/login?isTokenExpired=true",
          screen: WEBVIEW_SCREEN.LOGIN,
          isStack: false,
        });
        return;
      }

      if (statusCode === 404) {
        stackRouterPush(router, {
          path: "/inquiries",
          screen: WEBVIEW_SCREEN.MY_INQUIRY,
          isStack: false,
        });
        return;
      }

      customToast("예상하지 못한 에러가 발생했습니다. 다시 시도해주세요.");
    },
    onSuccess() {
      stackRouterPush(router, {
        path: "/inquiries",
        screen: WEBVIEW_SCREEN.MY_INQUIRY,
        isStack: false,
      });
    },
  });
};
