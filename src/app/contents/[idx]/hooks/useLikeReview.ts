import { MutationOptions, useMutation } from "@tanstack/react-query";
import axiosInstance from "@/utils/axios";

export const useLikeReview = (
  idx: number | string,
  mutationOption: MutationOptions
) =>
  useMutation({
    mutationFn: () => axiosInstance.post(`/apis/review/${idx}/like`),
    ...mutationOption,
  });
