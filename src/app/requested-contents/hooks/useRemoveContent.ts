import { ResponseError } from "@/types/api";
import axiosInstance from "@/utils/axios";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

export const useRemoveContent = ({
  idx,
  onSuccess,
  onError,
}: UseMutationOptions<AxiosResponse, ResponseError> & {
  idx: number;
}) =>
  useMutation({
    mutationFn: () => {
      return axiosInstance.delete(`/apis/culture-content/request/${idx}`);
    },
    onSuccess,
    onError,
  });
