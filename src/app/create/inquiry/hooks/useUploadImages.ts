import axiosInstance from "@/shared/helpers/axios";
import { UploadedFileEntity } from "@/shared/types/api/upload/UploadedFileEntity";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

export const useUploadInquiryImages = (
  props: UseMutationOptions<
    AxiosResponse<UploadedFileEntity[]>,
    AxiosError,
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
