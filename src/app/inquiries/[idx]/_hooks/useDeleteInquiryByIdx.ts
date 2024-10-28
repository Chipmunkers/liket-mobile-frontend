import { WEBVIEW_SCREEN } from "@/shared/consts/webview/screen";
import axiosInstance from "@/shared/helpers/axios";
import customToast from "@/shared/helpers/customToast";
import { stackRouterPush } from "@/shared/helpers/stackRouter";
import { useExceptionHandler } from "@/shared/hooks/useExceptionHandler";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

export const useDeleteInquiryByIdx = () => {
  const router = useRouter();
  const exceptionHandler = useExceptionHandler();

  return useMutation<unknown, AxiosError, number>({
    mutationFn: async (idx: number) => {
      await axiosInstance.delete(`/apis/inquiry/${idx}`);
    },
    onError(err) {
      exceptionHandler(err, [
        401,
        {
          statusCode: 404,
          handler() {
            stackRouterPush(router, {
              path: "/inquiries",
              screen: WEBVIEW_SCREEN.MY_INQUIRY,
              isStack: false,
            });
          },
        },
      ]);
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
