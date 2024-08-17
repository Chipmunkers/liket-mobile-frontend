import { ResponseError } from "@/types/api";
import axiosInstance from "@/utils/axios";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

export const useEditContent = ({
  idx,
  onSuccess,
  onError,
}: UseMutationOptions<AxiosResponse, ResponseError, CreateContentRequestDto> & {
  idx: string | null;
}) =>
  useMutation({
    mutationFn: (param) => {
      return axiosInstance.put(`/apis/culture-content/request/${idx}`, param);
    },
    onSuccess,
    onError,
  });
