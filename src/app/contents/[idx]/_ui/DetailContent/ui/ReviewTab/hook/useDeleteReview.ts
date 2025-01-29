import {
  DefaultError,
  MutationOptions,
  useMutation,
} from "@tanstack/react-query";
import axiosInstance from "@/shared/helpers/axios";

export const useDeleteReview = (
  mutationOption: MutationOptions<unknown, DefaultError, string>
) =>
  useMutation({
    mutationFn: (idx) => axiosInstance.delete(`/apis/review/${idx}`),
    ...mutationOption,
  });
