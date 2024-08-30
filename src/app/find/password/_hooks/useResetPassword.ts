import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import axiosInstance from "@/shared/helpers/axios";
import { AxiosError } from "axios";
import { useExceptionHandler } from "@/shared/hooks/useExceptionHandler";
import customToast from "@/shared/helpers/customToast";

interface ResetPwDto {
  emailToken: string;
  pw: string;
}

export const useResetPassword = (
  props: UseMutationOptions<unknown, AxiosError, ResetPwDto>
) => {
  const exceptionHandler = useExceptionHandler();

  return useMutation({
    mutationFn: async (param: ResetPwDto) => {
      const { data } = await axiosInstance.post("/apis/user/pw/find", param);

      return data;
    },
    onError(err) {
      exceptionHandler(err, [
        {
          statusCode: 401,
          handler() {
            customToast(
              "인증 상태가 만료되었습니다. 처음부터 다시 시도해주세요."
            );
          },
        },
      ]);
    },
    ...props,
  });
};
