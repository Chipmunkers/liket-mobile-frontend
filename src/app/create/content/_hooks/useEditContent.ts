import axiosInstance from "@/shared/helpers/axios";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

export const useEditContent = ({
  idx,
  onSuccess,
  onError,
}: UseMutationOptions<AxiosResponse, AxiosError> & {
  idx: string | null;
}) =>
  useMutation({
    mutationFn: (param) => {
      return axiosInstance.put(`/apis/culture-content/request/${idx}`, param);
    },
    onSuccess,
    onError,
  });
