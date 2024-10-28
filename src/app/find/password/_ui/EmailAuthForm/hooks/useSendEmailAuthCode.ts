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
      try {
        await axiosInstance.post("/apis/user/email/duplicate-check", body);

        customToast("해당 이메일로 가입된 계정이 없습니다.");
        return;
      } catch (err) {}

      setCanResend(false);
      setSendAuthCode(true);
      customToast("인증번호를 발송했습니다.");
      await axiosInstance.post("/apis/email-cert/send", { type: 1, ...body });
    },
    onSuccess: () => {
      timerStart();

      setTimeout(() => {
        setCanResend(true);
      }, 10 * 1000); // 10초
    },
    onError: (err) => {
      setCanResend(true);

      exceptionHandler(err, [
        {
          statusCode: 400,
          handler() {
            customToast("올바르지 않은 이메일 형식입니다.");
          },
        },
      ]);
    },
  });
};
