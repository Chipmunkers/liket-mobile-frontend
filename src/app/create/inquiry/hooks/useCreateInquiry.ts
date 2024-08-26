import { WEBVIEW_SCREEN } from "@/shared/consts/webview/screen";
import axiosInstance from "@/shared/helpers/axios";
import customToast from "@/shared/helpers/customToast";
import { stackRouterPush } from "@/shared/helpers/stackRouter";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/navigation";

interface CreateInquiryDto {
  title: string;
  contents: string;
  imgList: string[];
  typeIdx: number;
}

export const useCreateInquiry = (
  props: UseMutationOptions<
    AxiosResponse<{
      idx: number;
    }>,
    AxiosError,
    CreateInquiryDto
  >
) => {
  const router = useRouter();

  return useMutation({
    mutationFn: (param) => axiosInstance.post(`/apis/inquiry`, param),
    onError: (err) => {
      const statusCode = err.response?.status;

      if (statusCode === 401) {
        stackRouterPush(router, {
          path: "/login?isTokenExpired=true",
          screen: WEBVIEW_SCREEN.LOGIN,
          isStack: false,
        });
        return;
      }

      customToast("예상하지 못한 에러가 발생했습니다. 다시 시도해주세요.");
    },
    ...props,
  });
};
