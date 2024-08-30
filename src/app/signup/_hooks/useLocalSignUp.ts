import axiosInstance from "@/shared/helpers/axios";
import customToast from "@/shared/helpers/customToast";
import { useExceptionHandler } from "@/shared/hooks/useExceptionHandler";
import { SetState } from "@/shared/types/react";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

interface LocalSignUpDto {
  file?: File;
  nickname: string;
  birth: number | null;
  gender: 1 | 2 | null;
  emailToken: string;
  pw: string;
}

export const useLocalSignUp = (
  props: UseMutationOptions<{ token: string }, AxiosError<any>, unknown>,
  setFormIndex: SetState<number>
) => {
  const exceptionHandler = useExceptionHandler();

  return useMutation({
    mutationFn: async (param: LocalSignUpDto) => {
      const { data } = await axiosInstance.post<{ token: string }>(
        "/apis/user/local",
        param,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return data;
    },
    onError(err) {
      exceptionHandler(err, [
        {
          statusCode: 401,
          handler() {
            customToast("이메일 인증이 만료되었습니다. 다시 시도해주세요.");
            setFormIndex(0);
          },
        },
        {
          statusCode: 409,
          handler() {
            customToast("이미 사용중인 이메일 계정입니다.");
            setFormIndex(0);
          },
        },
      ]);
    },
    ...props,
  });
};
