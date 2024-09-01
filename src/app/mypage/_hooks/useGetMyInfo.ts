import axiosInstance from "@/shared/helpers/axios";
import { MutationOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { MyInfoEntity } from "@/shared/types/api/user/MyInfoEntity";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { stackRouterPush } from "@/shared/helpers/stackRouter";
import { WEBVIEW_SCREEN } from "@/shared/consts/webview/screen";
import { useExceptionHandler } from "@/shared/hooks/useExceptionHandler";

export const useGetMyInfo = (
  options: MutationOptions<MyInfoEntity, AxiosError>
) => {
  const router = useRouter();
  const exceptionHandler = useExceptionHandler();

  const query = useQuery<MyInfoEntity, AxiosError>({
    queryKey: ["mypage"],
    queryFn: async () => {
      const { data } = await axiosInstance.get<MyInfoEntity>("/apis/user/my");

      return data;
    },
    ...options,
  });

  useEffect(() => {
    if (!query.error) return;

    exceptionHandler(query.error, [
      {
        statusCode: 401,
        handler() {
          stackRouterPush(router, {
            path: "/login",
            screen: WEBVIEW_SCREEN.LOGIN,
            isStack: false,
          });
        },
      },
      418,
      429,
      500,
      502,
      504,
    ]);
  }, [query.error]);

  return query;
};
