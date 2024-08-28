import { MutationOptions, useMutation } from "@tanstack/react-query";
import axiosInstance from "@/shared/helpers/axios";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { stackRouterPush } from "@/shared/helpers/stackRouter";
import { WEBVIEW_SCREEN } from "@/shared/consts/webview/screen";
import customToast from "@/shared/helpers/customToast";

export const useDeleteReview = (
  mutationOption: MutationOptions<void, AxiosError, number>
) => {
  const router = useRouter();

  const mutation = useMutation<void, AxiosError, number>({
    mutationFn: async (idx: number) => {
      await axiosInstance.delete(`/apis/review/${idx}`);

      return;
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
        return customToast("이미 삭제된 리뷰입니다.");
      }

      customToast("예상하지 못한 에러가 발생했습니다. 다시 시도해주세요.");
    },
    ...mutationOption,
  });

  return mutation;
};
