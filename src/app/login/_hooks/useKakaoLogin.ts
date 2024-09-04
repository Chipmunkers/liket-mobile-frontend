import { WEBVIEW_SCREEN } from "@/shared/consts/webview/screen";
import axiosInstance from "@/shared/helpers/axios";
import { stackRouterPush } from "@/shared/helpers/stackRouter";
import { useExceptionHandler } from "@/shared/hooks/useExceptionHandler";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/navigation";

export const useKakaoLogin = () => {
  const exceptionHandler = useExceptionHandler();
  const router = useRouter();

  return useMutation<AxiosResponse, AxiosError, string>({
    mutationFn: async (accessToken: string) => {
      return await axiosInstance.post("/apis/auth/kakao/app", {
        accessToken,
      });
    },
    onSuccess(response) {
      stackRouterPush(router, {
        path: "/",
        screen: WEBVIEW_SCREEN.MAIN,
        isStack: false,
      });
    },
    onError(err) {
      exceptionHandler(err, []);
    },
  });
};
