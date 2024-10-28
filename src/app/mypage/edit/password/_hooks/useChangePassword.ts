import axiosInstance from "@/shared/helpers/axios";
import customToast from "@/shared/helpers/customToast";
import { useExceptionHandler } from "@/shared/hooks/useExceptionHandler";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useChangePassword = (
  props: UseMutationOptions<
    unknown,
    AxiosError,
    {
      currPw: string;
      resetPw: string;
    }
  >
) => {
  const exceptionHandler = useExceptionHandler();

  return useMutation({
    mutationFn: async (param) => {
      await axiosInstance.post("/apis/user/pw/reset", param);
    },
    onError(err) {
      exceptionHandler(err, [
        {
          statusCode: 400,
          handler() {
            customToast("비밀번호가 올바르지 않습니다.");
          },
        },
      ]);
    },
    ...props,
  });
};
