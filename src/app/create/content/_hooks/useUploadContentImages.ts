import { WEBVIEW_SCREEN } from "@/shared/consts/webview/screen";
import axiosInstance from "@/shared/helpers/axios";
import customToast from "@/shared/helpers/customToast";
import { stackRouterPush } from "@/shared/helpers/stackRouter";
import { UploadedFileEntity } from "@/shared/types/api/upload/UploadedFileEntity";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/navigation";

export const useUploadContentImages = (
  props: UseMutationOptions<
    AxiosResponse<UploadedFileEntity[]>,
    AxiosError,
    FormData
  >
) => {
  const router = useRouter();

  return useMutation<AxiosResponse<UploadedFileEntity[]>, AxiosError, FormData>(
    {
      mutationFn: (files) => {
        return axiosInstance.post("/apis/upload/content-img", files, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      },
      onError: (err) => {
        if (err.response?.status === 401) {
          stackRouterPush(router, {
            path: "/login?isTokenExpired=true",
            screen: WEBVIEW_SCREEN.LOGIN,
          });
          return;
        }

        if (err.response?.status === 400) {
          customToast("jpg또는 png만 업로드할 수 있습니다.");
          return;
        }

        customToast("예상하지 못한 에러가 발생했습니다. 다시 시도해주세요.");
      },
      ...props,
    }
  );
};
