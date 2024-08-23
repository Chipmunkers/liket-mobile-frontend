import axiosInstance from "@/shared/helpers/axios";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useDeleteAccount = (
  props?: UseMutationOptions<
    unknown,
    AxiosError,
    {
      contents: string;
      type: number;
    }
  >
) =>
  useMutation({
    mutationFn: (param) =>
      axiosInstance.delete("/apis/user", {
        data: param,
      }),
    ...props,
  });
