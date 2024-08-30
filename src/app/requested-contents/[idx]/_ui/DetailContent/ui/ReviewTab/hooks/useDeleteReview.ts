import { MutationOptions, useMutation } from "@tanstack/react-query";
import axiosInstance from "@/shared/helpers/axios";
import { AxiosError } from "axios";

export const useDeleteReview = (
  mutationOption: MutationOptions<unknown, AxiosError, number>
) => {
  return useMutation<unknown, AxiosError, number>({
    mutationFn: async (idx: number) => {
      await axiosInstance.delete(`/apis/review/${idx}`);
    },
    ...mutationOption,
  });
};
