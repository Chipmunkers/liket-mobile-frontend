import axiosInstance from "@/shared/helpers/axios";
import customToast from "@/shared/helpers/customToast";
import { useExceptionHandler } from "@/shared/hooks/useExceptionHandler";
import { SetState } from "@/shared/types/react";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

interface Dto {
  email: string;
}

export const useSendEmailAuthCode = (
  setCanResend: SetState<boolean>,
  timerStart: () => void,
  setSendAuthCode: SetState<boolean>
) => {
  const exceptionHandler = useExceptionHandler();

  return useMutation<void, AxiosError, Dto>({
    mutationFn: async (body: { email: string }) => {
      await axiosInstance.post("/apis/user/email/duplicate-check", body);

      setCanResend(false);
      setSendAuthCode(true);
      customToast("인증번호를 발송했습니다.");
      await axiosInstance.post("/apis/email-cert/send", { type: 0, ...body });
    },
    onSuccess: () => {
      timerStart();

      setTimeout(() => {
        setCanResend(true);
      }, 10 * 1000); // 10초
    },
    onError: (err) => {
      setCanResend(true);

      exceptionHandler(
        err,
        [
          {
            statusCode: 409,
            handler() {
              customToast("이미 가입된 계정입니다.");
            },
          },
          {
            statusCode: 400,
            handler() {
              customToast("이메일 양식이 올바르지 않습니다.");
            },
          },
        ],
        false
      );
    },
  });
};
