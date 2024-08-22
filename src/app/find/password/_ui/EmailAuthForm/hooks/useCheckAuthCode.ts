import { UpdateFormFunc } from "@/app/find/password/types";
import axiosInstance from "@/shared/helpers/axios";
import customToast from "@/shared/helpers/customToast";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

interface Dto {
  email: string;
  code: string;
}

export const useCheckAuthCode = (updateForm: UpdateFormFunc) =>
  useMutation<{ token: string; email: string }, AxiosError, Dto>({
    mutationFn: async (body) => {
      const { data } = await axiosInstance.post<{ token: string }>(
        "/apis/email-cert/check",
        {
          ...body,
          type: 1,
        }
      );

      return {
        ...data,
        email: body.email,
      };
    },
    onSuccess: (data) => {
      updateForm({
        emailToken: data.token,
      });
    },
    onError: (err) => {
      if (err.response?.status === 400) {
        customToast("인증번호가 올바르지 않습니다.");
        return;
      }

      if (err.response?.status === 404) {
        customToast("인증번호가 올바르지 않습니다.");
        return;
      }

      customToast("예상하지 못한 에러가 발생했습니다. 다시 시도해주세요.");
    },
  });
