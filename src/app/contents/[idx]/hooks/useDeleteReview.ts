import {
  DefaultError,
  MutationOptions,
  useMutation,
} from "@tanstack/react-query";
import axiosInstance from "@/utils/axios";

export const useDeleteReview = (
  mutationOption: MutationOptions<unknown, DefaultError, number>
) =>
  useMutation({
    mutationFn: (idx: number) => axiosInstance.delete(`/apis/review/${idx}`),
    ...mutationOption,
  });
