import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import axiosInstance from "../utils/axios";

export const useCancelLikeContent = (
  idx: string | number,
  props: UseMutationOptions
) =>
  useMutation({
    mutationFn: () => axiosInstance.delete(`/apis/culture-content/${idx}/like`),
    ...props,
  });

export const useLikeContent = (
  idx: number | string,
  props: UseMutationOptions
) =>
  useMutation({
    mutationFn: () => axiosInstance.post(`/apis/culture-content/${idx}/like`),
    ...props,
  });
