import { ResponseError } from "@/types/api";
import axiosInstance from "@/shared/helpers/axios";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

interface Payload {
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
    ResponseError,
    Payload
  >
) =>
  useMutation({
    mutationFn: (param) => axiosInstance.post(`/apis/inquiry`, param),
    ...props,
  });
