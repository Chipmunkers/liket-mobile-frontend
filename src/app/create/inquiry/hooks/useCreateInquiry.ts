import axiosInstance from "@/shared/helpers/axios";
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
) =>
  useMutation({
    mutationFn: (param) => axiosInstance.post(`/apis/inquiry`, param),
    ...props,
  });
