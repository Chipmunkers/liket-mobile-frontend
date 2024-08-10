import { ResponseError } from "@/types/api";
import axiosInstance from "@/utils/axios";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

export const useUploadReviewImages = (
  props: UseMutationOptions<AxiosResponse, ResponseError, File[]>
) =>
  useMutation({
    mutationFn: (files) => {
      return axiosInstance.post("/apis/upload/review", files, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    ...props,
  });

interface Payload {
  idx: number;
  imgList: string[];
  description: string;
  starRating: number;
  visitTime: string;
}

export const useWriteReview = (
  props: UseMutationOptions<AxiosResponse, ResponseError, Payload>
) =>
  useMutation({
    mutationFn: ({ idx, ...remains }) => {
      return axiosInstance.post(`/apis/culture-content/${idx}/review`, remains);
    },
    ...props,
  });
