import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import axiosInstance from "@/utils/axios";

export const useLikeContent = (
  idx: number | string,
  props: UseMutationOptions
) =>
  useMutation({
    mutationFn: () => axiosInstance.post(`/apis/culture-content/${idx}/like`),
    ...props,
  });
