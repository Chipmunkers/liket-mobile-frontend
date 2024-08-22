import { WEBVIEW_SCREEN } from "@/shared/consts/webview/screen";
import axiosInstance from "@/shared/helpers/axios";
import customToast from "@/shared/helpers/customToast";
import { stackRouterPush } from "@/shared/helpers/stackRouter";
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
      if (err.response?.status === 400) {
        customToast("아이디 또는 비밀번호가 잘못되었습니다.");
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
