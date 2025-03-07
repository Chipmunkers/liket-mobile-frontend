import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/shared/helpers/axios";
import { ContentEntity } from "@/shared/types/api/content/ContentEntity";
import { AxiosError } from "axios";
import { useExceptionHandler } from "@/shared/hooks/useExceptionHandler";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { stackRouterBack } from "@/shared/helpers/stackRouter";

export const useGetCultureContentByIdx = (idx: number) => {
  const exceptionHandler = useExceptionHandler();
  const router = useRouter();

  const query = useQuery<ContentEntity, AxiosError>({
    queryKey: [`requested-culture-content-${idx}`],
    queryFn: async () => {
      const { data } = await axiosInstance.get<ContentEntity>(
        `/apis/culture-content/${idx}`
      );

      return data;
    },
    staleTime: 0,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (!query.error) return;

    exceptionHandler(query.error, [
      {
        statusCode: 403,
        handler() {
          stackRouterBack(router);
        },
      },
      500,
      502,
      504,
    ]);
  }, [query.error]);

  return query;
};
