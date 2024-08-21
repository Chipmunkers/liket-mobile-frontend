import { ResponseError } from "@/types/api";
import axiosInstance from "@/shared/helpers/axios";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

export const useChangePassword = (
  props: UseMutationOptions<
    unknown,
    ResponseError,
    {
      currPw: string;
      resetPw: string;
    }
  >
) =>
  useMutation({
    mutationFn: (param) => axiosInstance.post("/apis/user/pw/reset", param),
    ...props,
  });
