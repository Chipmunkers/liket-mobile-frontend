import axiosInstance from "@/shared/helpers/axios";
import { MutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useDeleteContent = (
  options?: MutationOptions<void, AxiosError, number>
) =>
  useMutation<void, AxiosError, number>({
    mutationFn: async (idx: number) => {
      await axiosInstance.delete(`/apis/culture-content/request/${idx}`);
      return;
    },
    ...options,
  });
