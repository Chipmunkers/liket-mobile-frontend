import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import axiosInstance from "@/shared/helpers/axios";

export const useCancelLikeContent = (
  idx: string | number,
  props: UseMutationOptions
) =>
  useMutation({
    mutationFn: () => axiosInstance.delete(`/apis/culture-content/${idx}/like`),
    ...props,
  });
