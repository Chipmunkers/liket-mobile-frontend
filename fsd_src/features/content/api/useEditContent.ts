import { stackRouterPush } from "@/shared/helpers/stackRouter";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { UpsertContentDto } from "../../../shared/api/dto/UpsertContentDto";
import { useExceptionHandler } from "../../../shared/hook/useExceptionHandler";
import axiosInstance from "../../../shared/helper/axiosInstance";
import { WEBVIEW_SCREEN } from "@/shared/consts/webview/screen";
import customToast from "../../../shared/helper/customToast";

export const useEditContent = ({
  idx,
}: UseMutationOptions<AxiosResponse, AxiosError, UpsertContentDto> & {
  idx: number;
}) => {
  const exceptionHandler = useExceptionHandler();
  const router = useRouter();

  return useMutation<AxiosResponse, AxiosError, UpsertContentDto>({
    mutationFn: (param) => {
      return axiosInstance.put(`/apis/culture-content/request/${idx}`, param);
    },
    onSuccess: () => {
      stackRouterPush(router, {
        path: `/requested-contents/${idx}`,
        screen: WEBVIEW_SCREEN.REQUESTED_CONTENT_DETAIL,
        isStack: false,
      });
    },
    onError: (err) => {
      exceptionHandler(err, [
        401,
        {
          statusCode: 409,
          handler() {
            customToast(
              "활성화된 컨텐츠는 수정할 수 없습니다. 문의 주시기 바랍니다."
            );
          },
        },
      ]);
    },
  });
};
