import axiosInstance from "@/shared/helpers/axios";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

export const useRemoveContent = ({
  onSuccess,
  onError,
}: UseMutationOptions<AxiosResponse, AxiosError, string | null>) =>
  useMutation({
    mutationFn: (idx) => {
      return axiosInstance.delete(`/apis/culture-content/request/${idx}`);
    },
    onSuccess,
    onError,
  });
