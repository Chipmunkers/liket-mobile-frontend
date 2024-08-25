import { WEBVIEW_SCREEN } from "@/shared/consts/webview/screen";
import axiosInstance from "@/shared/helpers/axios";
import customToast from "@/shared/helpers/customToast";
import { stackRouterPush } from "@/shared/helpers/stackRouter";
import { MutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

export const useDeleteContent = (
  options?: MutationOptions<void, AxiosError, number>
) => {
  const router = useRouter();

  return useMutation<void, AxiosError, number>({
    mutationFn: async (idx: number) => {
      await axiosInstance.delete(`/apis/culture-content/request/${idx}`);
      return;
    },
    onError: (err) => {
      const statusCode = err.response?.status || 500;

      if (statusCode === 401) {
        stackRouterPush(router, {
          path: "/login?isTokenExpired=true",
          screen: WEBVIEW_SCREEN.LOGIN,
          isStack: false,
        });
        return;
      }

      if (statusCode === 409) {
        return customToast(
          "활성화된 컨텐츠는 삭제할 수 없습니다.\n문의주시기 바랍니다."
        );
      }

      return customToast(
        "예상하지 못한 에러가 발생했습니다. 다시 시도해주세요."
      );
    },
    ...options,
  });
};
