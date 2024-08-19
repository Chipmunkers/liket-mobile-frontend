import { ResponseError } from "@/types/api";
import { UploadedFileEntity } from "@/types/upload";
import axiosInstance from "@/utils/axios";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

export const useUploadInquiryImages = (
  props: UseMutationOptions<
    AxiosResponse<UploadedFileEntity[]>,
    ResponseError,
    FormData
  >
) =>
  useMutation({
    mutationFn: (files) => {
      return axiosInstance.post("/apis/upload/inquiry", files, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    ...props,
  });
