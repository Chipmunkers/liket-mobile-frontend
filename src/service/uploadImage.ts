import { ResponseError } from "@/types/api";
import { UploadedFileEntity } from "@/types/api/upload";
import axiosInstance from "@/shared/helpers/axios";
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

export const useUploadContentImages = (
  props: UseMutationOptions<
    AxiosResponse<UploadedFileEntity[]>,
    ResponseError,
    FormData
  >
) =>
  useMutation({
    mutationFn: (files) => {
      return axiosInstance.post("/apis/upload/content-img", files, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    ...props,
  });
