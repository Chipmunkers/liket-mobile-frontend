import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import axiosInstance from "@/shared/helpers/axios";
import { AxiosError } from "axios";

interface ResetPwDto {
  emailToken: string;
  pw: string;
}

export const useResetPassword = (
  props: UseMutationOptions<unknown, AxiosError, ResetPwDto>
) =>
  useMutation({
    mutationFn: async (param: ResetPwDto) => {
      const { data } = await axiosInstance.post("/apis/user/pw/find", param);

      return data;
    },
    ...props,
  });
