import { WEBVIEW_SCREEN } from "@/shared/consts/webview/screen";
import axiosInstance from "@/shared/helpers/axios";
import { stackRouterPush } from "@/shared/helpers/stackRouter";
import { useExceptionHandler } from "@/shared/hooks/useExceptionHandler";
import { MyInfoEntity } from "@/shared/types/api/user/MyInfoEntity";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const useGetMyInfo = () => {
  const router = useRouter();
  const exceptionHandler = useExceptionHandler();

  const query = useQuery<MyInfoEntity, AxiosError>({
    queryKey: [`get-my-info`],
    queryFn: async () => {
      const { data } = await axiosInstance.get<MyInfoEntity>("/apis/user/my");

      return data;
    },
  });

  useEffect(() => {
    if (!query.error) return;

    const status = query.error.response?.status;

    exceptionHandler(query.error, [401, 500, 502, 504]);
  }, [query.error]);

  return query;
};
