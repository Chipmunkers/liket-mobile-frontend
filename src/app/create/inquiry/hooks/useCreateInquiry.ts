import axiosInstance from "@/shared/helpers/axios";
import { useExceptionHandler } from "@/shared/hooks/useExceptionHandler";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

interface CreateInquiryDto {
  title: string;
  contents: string;
  imgList: string[];
  typeIdx: number;
}

export const useCreateInquiry = (
  props: UseMutationOptions<
    AxiosResponse<{
      idx: number;
    }>,
    AxiosError,
    CreateInquiryDto
  >
) => {
  const exceptionHandler = useExceptionHandler();

  return useMutation({
    mutationFn: (param) => axiosInstance.post(`/apis/inquiry`, param),
    onError: (err) => {
      exceptionHandler(err, [401, 418]);
    },
    ...props,
  });
};
