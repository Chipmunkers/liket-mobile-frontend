import { WEBVIEW_SCREEN } from "@/shared/consts/webview/screen";
import axiosInstance from "@/shared/helpers/axios";
import { stackRouterPush } from "@/shared/helpers/stackRouter";
import { useExceptionHandler } from "@/shared/hooks/useExceptionHandler";
import { ReviewEntity } from "@/shared/types/api/review/ReviewEntity";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const useGetReviewByIdx = (idx: string) => {
  const router = useRouter();
  const exceptionHandler = useExceptionHandler();

  if (isNaN(Number(idx))) {
    stackRouterPush(router, {
      path: "/error/wrong-access",
      screen: WEBVIEW_SCREEN.ERROR,
      isStack: false,
    });
  }

  const query = useQuery<ReviewEntity, AxiosError>({
    queryKey: [`review-${idx}`],
    queryFn: async () => {
      const { data } = await axiosInstance.get<ReviewEntity>(
        `/apis/review/${idx}`
      );

      return data;
    },
  });

  useEffect(() => {
    if (!query.error) return;

    exceptionHandler(query.error, [
      {
        statusCode: 404,
        handler() {
          stackRouterPush(router, {
            path: "/error/wrong-access",
            screen: WEBVIEW_SCREEN.ERROR,
            isStack: false,
          });
        },
      },
      500,
      502,
      504,
    ]);
  }, [query.error]);

  // TODO: 본인 리뷰가 아니면 wrong access로 돌려야함

  return query;
};
