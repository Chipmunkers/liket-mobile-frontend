import { WEBVIEW_SCREEN } from "@/shared/consts/webview/screen";
import axiosInstance from "@/shared/helpers/axios";
import customToast from "@/shared/helpers/customToast";
import { stackRouterPush } from "@/shared/helpers/stackRouter";
import { useExceptionHandler } from "@/shared/hooks/useExceptionHandler";
import { UploadedFileEntity } from "@/shared/types/api/upload/UploadedFileEntity";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/navigation";

export const useUploadInquiryImages = (
  props: UseMutationOptions<
    AxiosResponse<UploadedFileEntity[]>,
    AxiosError,
    FormData
  >
) => {
  const exceptionHandler = useExceptionHandler();

  return useMutation({
    mutationFn: (files) => {
      return axiosInstance.post("/apis/upload/inquiry", files, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    onError: (err) => {
      exceptionHandler(err, [
        {
          statusCode: 400,
          handler() {
            customToast("jpg또는 png 파일만 업로드할 수 있습니다.");
          },
        },
        {
          statusCode: 413,
          handler() {
            customToast("파일 용량이 너무 큽니다.");
          },
        },
        401,
      ]);
    },
    ...props,
  });
};
