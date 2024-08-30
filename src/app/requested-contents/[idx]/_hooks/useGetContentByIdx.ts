import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/shared/helpers/axios";
import { ContentEntity } from "@/shared/types/api/content/ContentEntity";
import { AxiosError } from "axios";
import { useEffect } from "react";
import { useExceptionHandler } from "@/shared/hooks/useExceptionHandler";

export const useGetCultureContentByIdx = (idx: number) => {
  const exceptionHandler = useExceptionHandler();

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

    exceptionHandler(query.error, [401, 500, 502, 504], false);
  }, [query.error]);

  return query;
};
