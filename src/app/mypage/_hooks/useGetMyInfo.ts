import axiosInstance from "@/shared/helpers/axios";
import { MutationOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { MyInfoEntity } from "@/shared/types/api/user/MyInfoEntity";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { stackRouterPush } from "@/shared/helpers/stackRouter";
import { WEBVIEW_SCREEN } from "@/shared/consts/webview/screen";

export const useGetMyInfo = (
  options: MutationOptions<MyInfoEntity, AxiosError>
) => {
  const router = useRouter();

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

    const status = query.error.response?.status;

    if (status === 401) {
      stackRouterPush(router, {
        path: "/login",
        screen: WEBVIEW_SCREEN.LOGIN,
        isStack: false,
      });
      return;
    }

    stackRouterPush(router, {
      path: "/error",
      screen: WEBVIEW_SCREEN.ERROR,
      isStack: false,
    });
  }, [query.error]);

  return query;
};
