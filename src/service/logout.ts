import { ResponseError } from "@/types/api";
import axiosInstance from "@/utils/axios";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

export const useLogout = (props?: UseMutationOptions<unknown, ResponseError>) =>
  useMutation({
    mutationFn: () => axiosInstance.delete("/apis/auth"),
    ...props,
  });
