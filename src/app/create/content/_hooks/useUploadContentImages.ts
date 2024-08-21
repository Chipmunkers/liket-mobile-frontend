import axiosInstance from "@/shared/helpers/axios";
import { UploadedFileEntity } from "@/shared/types/api/upload/UploadedFileEntity";
import { ResponseError } from "@/types/api";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

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
