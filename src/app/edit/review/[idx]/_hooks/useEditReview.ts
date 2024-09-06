import { WEBVIEW_SCREEN } from "@/shared/consts/webview/screen";
import axiosInstance from "@/shared/helpers/axios";
import { stackRouterPush } from "@/shared/helpers/stackRouter";
import { useExceptionHandler } from "@/shared/hooks/useExceptionHandler";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

export const useEditReview = (
  props: UseMutationOptions<
    number,
    AxiosError,
    {
      idx: number;
      imgList: string[];
      description: string;
      starRating: number;
      visitTime: string;
    }
  >
) => {
  const exceptionHandler = useExceptionHandler();
  const router = useRouter();

  return useMutation({
    mutationFn: async ({ idx, ...body }) => {
      await axiosInstance.put(`/apis/review/${idx}`, body);

      return idx;
    },
    onError(err) {
      exceptionHandler(err, [
        401,
        {
          statusCode: 403,
          handler() {
            stackRouterPush(router, {
              path: "/error/wrong-access",
              screen: WEBVIEW_SCREEN.ERROR,
              isStack: false,
            });
          },
        },
        418,
      ]);
    },
    ...props,
  });
};
