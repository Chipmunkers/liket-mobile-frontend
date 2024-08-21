import { ResponseError } from "@/types/api";
import axiosInstance from "@/shared/helpers/axios";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

interface Payload {
  contents: string;
  type: number;
}
export const useDeleteAccount = (
  props?: UseMutationOptions<unknown, ResponseError, Payload>
) =>
  useMutation({
    mutationFn: (param) =>
      axiosInstance.delete("/apis/user", {
        data: param,
      }),
    ...props,
  });
