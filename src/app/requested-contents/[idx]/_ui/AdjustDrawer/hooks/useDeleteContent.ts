import { WEBVIEW_SCREEN } from "@/shared/consts/webview/screen";
import axiosInstance from "@/shared/helpers/axios";
import customToast from "@/shared/helpers/customToast";
import { stackRouterPush } from "@/shared/helpers/stackRouter";
import { useExceptionHandler } from "@/shared/hooks/useExceptionHandler";
import { MutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

export const useDeleteContent = (
  options?: MutationOptions<void, AxiosError, number>
) => {
  const router = useRouter();
  const exceptionHandler = useExceptionHandler();

  return useMutation<void, AxiosError, number>({
    mutationFn: async (idx: number) => {
      await axiosInstance.delete(`/apis/culture-content/request/${idx}`);
      return;
    },
    onError: (err) => {
      exceptionHandler(err, [
        401,
        {
          statusCode: 409,
          handler() {
            customToast(
              "활성화된 컨텐츠는 삭제할 수 없습니다. 문의주시기 바랍니다."
            );
          },
        },
      ]);
    },
    ...options,
  });
};
