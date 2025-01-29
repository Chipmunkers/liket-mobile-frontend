import axiosInstance from "@/shared/helpers/axios";
import customToast from "@/shared/helpers/customToast";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { useExceptionHandler } from "../../../shared/hook/useExceptionHandler";
import { UploadedFileEntity } from "../../../shared/api/entity/UploadedFileEntity";

export const useUploadContentImages = (
  props: UseMutationOptions<
    AxiosResponse<UploadedFileEntity[]>,
    AxiosError,
    FormData
  >
) => {
  const exceptionHandler = useExceptionHandler();

  return useMutation({
    mutationFn: (files) => {
      return axiosInstance.post("/apis/upload/content-img", files, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    onError(err) {
      exceptionHandler(err, [
        {
          statusCode: 400,
          handler() {
            customToast("jpg또는 png파일만 업로드할 수 있습니다.");
          },
        },
        401,
        418,
        429,
        500,
        502,
        504,
      ]);
    },
    ...props,
  });
};
