import axiosInstance from "@/shared/helpers/axios";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

export const useUploadReviewImages = (
  props: UseMutationOptions<AxiosResponse, AxiosError, FormData>
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
