import { ResponseError } from "@/types/api";
import axiosInstance from "@/utils/axios";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

export const useRemoveContent = ({
  onSuccess,
  onError,
}: UseMutationOptions<AxiosResponse, ResponseError, string | null>) =>
  useMutation({
    mutationFn: (idx) => {
      return axiosInstance.delete(`/apis/culture-content/request/${idx}`);
    },
    onSuccess,
    onError,
  });
