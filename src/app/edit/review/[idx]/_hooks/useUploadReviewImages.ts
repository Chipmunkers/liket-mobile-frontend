import axiosInstance from "@/shared/helpers/axios";
import customToast from "@/shared/helpers/customToast";
import { useExceptionHandler } from "@/shared/hooks/useExceptionHandler";
import { UploadedFileEntity } from "@/shared/types/api/upload/UploadedFileEntity";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

export const useUploadReviewImages = (
  props: UseMutationOptions<UploadedFileEntity[], AxiosError, FormData>
) => {
  const exceptionHandler = useExceptionHandler();

  return useMutation({
    mutationFn: async (files) => {
      const { data } = await axiosInstance.post<UploadedFileEntity[]>(
        "/apis/upload/review",
        files,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return data;
    },
    onError(err) {
      exceptionHandler(err, [
        {
          statusCode: 400,
          handler() {
            customToast("jpg또는 png파일만 업로드할 수 있습니다.");
          },
        },
        {
          statusCode: 413,
          handler() {
            customToast("파일 용량이 너무 큽니다.");
          },
        },
        401,
        418,
      ]);
    },
    ...props,
  });
};
