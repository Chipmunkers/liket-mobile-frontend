import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import axiosInstance from "@/shared/helpers/axios";
import { AxiosError } from "axios";

export const useCancelLikeContent = (
  idx?: number,
  props?: UseMutationOptions<unknown, AxiosError>
) =>
  useMutation({
    mutationFn: async () => {
      if (!idx) return;

      return await axiosInstance.delete(`/apis/culture-content/${idx}/like`);
    },
    ...props,
  });
