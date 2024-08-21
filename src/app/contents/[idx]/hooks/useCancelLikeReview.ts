import { MutationOptions, useMutation } from "@tanstack/react-query";
import axiosInstance from "@/shared/helpers/axios";

export const useCancelLikeReview = (
  idx: number | string,
  mutationOption: MutationOptions
) =>
  useMutation({
    mutationFn: () => axiosInstance.delete(`/apis/review/${idx}/like`),
    ...mutationOption,
  });
