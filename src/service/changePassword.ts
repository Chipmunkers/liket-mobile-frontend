import axiosInstance from "@/shared/helpers/axios";
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
) =>
  useMutation({
    mutationFn: async (param) => {
      await axiosInstance.post("/apis/user/pw/reset", param);
    },
    ...props,
  });
