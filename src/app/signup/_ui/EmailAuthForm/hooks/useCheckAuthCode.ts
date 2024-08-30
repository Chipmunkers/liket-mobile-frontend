import { UpdateFormFunc } from "@/app/signup/types";
import axiosInstance from "@/shared/helpers/axios";
import customToast from "@/shared/helpers/customToast";
import { useExceptionHandler } from "@/shared/hooks/useExceptionHandler";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

interface Dto {
  email: string;
  code: string;
}

export const useCheckAuthCode = (updateForm: UpdateFormFunc) => {
  const exceptionHandler = useExceptionHandler();

  return useMutation<{ token: string; email: string }, AxiosError, Dto>({
    mutationFn: async (body) => {
      const { data } = await axiosInstance.post<{ token: string }>(
        "/apis/email-cert/check",
        {
          ...body,
          type: 0,
        }
      );

      return {
        ...data,
        email: body.email,
      };
    },
    onSuccess: (data) => {
      updateForm({
        email: data.email,
        emailToken: data.token,
      });
    },
    onError: (err) => {
      exceptionHandler(err, [
        {
          statusCode: 400,
          handler() {
            customToast("인증번호가 올바르지 않습니다.");
          },
        },
        {
          statusCode: 404,
          handler() {
            customToast("인증번호가 올바르지 않습니다.");
          },
        },
      ]);
    },
  });
};
