import { WEBVIEW_SCREEN } from "@/shared/consts/webview/screen";
import axiosInstance from "@/shared/helpers/axios";
import customToast from "@/shared/helpers/customToast";
import { stackRouterPush } from "@/shared/helpers/stackRouter";
import { SetState } from "@/shared/types/react";
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

  return useMutation<{ token: string }, AxiosError, Dto>({
    mutationFn: async ({ email, pw }) => {
      const { data } = await axiosInstance.post<{ token: string }>(
        "/api/auth/local"
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
      if (err.response?.status === 400) {
        customToast("데이터의 형태가 잘못되었습니다.");
        return;
      }

      if (err.response?.status === 401) {
        customToast("비밀번호가 잘못되었습니다.");
        return;
      }

      if (err.response?.status === 418) {
        customToast("정지된 사용자입니다.");
        return;
      }

      customToast("예상하지 못한 에러가 발생했습니다. 다시 시도해주세요.");
    },
  });
};
