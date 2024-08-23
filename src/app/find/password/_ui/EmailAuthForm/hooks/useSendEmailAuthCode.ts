import axiosInstance from "@/shared/helpers/axios";
import customToast from "@/shared/helpers/customToast";
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
) =>
  useMutation<void, AxiosError, Dto>({
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

      if (err.response?.status === 409) {
        customToast("이미 가입된 계정입니다.");
        return;
      }

      if (err.response?.status === 400) {
        customToast("허용되지 않은 이메일 양식입니다.");
        return;
      }
    },
  });
