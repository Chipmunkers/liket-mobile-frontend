import { WEBVIEW_SCREEN } from "@/shared/consts/webview/screen";
import axiosInstance from "@/shared/helpers/axios";
import customToast from "@/shared/helpers/customToast";
import { stackRouterPush } from "@/shared/helpers/stackRouter";
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
  const router = useRouter();

  return useMutation({
    mutationFn: (files) => {
      return axiosInstance.post("/apis/upload/inquiry", files, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    onError: (err) => {
      const statusCode = err.response?.status;

      if (statusCode === 400) {
        return customToast("jpg, png 파일만 업로드할 수 있습니다.");
      }

      if (statusCode === 401) {
        stackRouterPush(router, {
          path: "/login?isTokenExpired=true",
          screen: WEBVIEW_SCREEN.LOGIN,
          isStack: false,
        });
        return;
      }

      if (statusCode === 413) {
        return customToast("파일 용량이 너무 큽니다.");
      }

      return customToast(
        "예상하지 못한 에러가 발생했습니다. 다시 시도해주세요."
      );
    },
    ...props,
  });
};
