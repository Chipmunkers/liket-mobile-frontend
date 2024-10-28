import { WEBVIEW_SCREEN } from "@/shared/consts/webview/screen";
import axiosInstance from "@/shared/helpers/axios";
import customToast from "@/shared/helpers/customToast";
import { stackRouterPush } from "@/shared/helpers/stackRouter";
import { useExceptionHandler } from "@/shared/hooks/useExceptionHandler";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

interface Dto {
  email: string;
  pw: string;
}

export const useLogin = ({
  setAuthToken,
  setToken,
}: {
  setAuthToken: (token: string) => void;
  setToken: (token: string) => void;
}) => {
  const router = useRouter();
  const exceptionHandler = useExceptionHandler();

  return useMutation<{ token: string }, AxiosError, Dto>({
    mutationFn: async (body) => {
      const { data } = await axiosInstance.post<{ token: string }>(
        "/apis/auth/local",
        body
      );

      return data;
    },
    onSuccess: ({ token }) => {
      setAuthToken(token);
      setToken(token);
      stackRouterPush(router, {
        path: "/",
        screen: WEBVIEW_SCREEN.MAIN,
        isStack: false,
      });
    },
    onError: (err) => {
      exceptionHandler(err, [
        {
          statusCode: 400,
          handler() {
            customToast("아이디 또는 비밀번호가 잘못되었습니다.");
          },
        },
        {
          statusCode: 401,
          handler() {
            customToast("비밀번호가 잘못되었습니다.");
          },
        },
        {
          statusCode: 418,
          handler() {
            customToast("계정이 정지되었습니다.");
          },
        },
      ]);
    },
  });
};
