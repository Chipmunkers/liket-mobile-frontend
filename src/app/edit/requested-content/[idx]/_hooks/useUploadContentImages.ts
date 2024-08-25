import axiosInstance from "@/shared/helpers/axios";
import { UploadedFileEntity } from "@/shared/types/api/upload/UploadedFileEntity";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

export const useUploadContentImages = (
  props: UseMutationOptions<
    AxiosResponse<UploadedFileEntity[]>,
    AxiosError,
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
