import axiosInstance from "@/shared/helpers/axios";
import { useExceptionHandler } from "@/shared/hooks/useExceptionHandler";
import { SummaryContentEntity } from "@/shared/types/api/content/SummaryContentEntity";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect } from "react";

export const useGetContentsSearchResult = (
  searchKeyword: string | undefined
) => {
  const exceptionHandler = useExceptionHandler();

  const query = useQuery<SummaryContentEntity[], AxiosError>({
    queryKey: ["contents-search", searchKeyword],
    queryFn: async () => {
      const { data } = await axiosInstance.get<{
        contentList: SummaryContentEntity[];
      }>("/apis/culture-content/all", {
        params: {
          search: searchKeyword,
          accept: true,
        },
      });

      return data.contentList;
    },
    enabled: !!searchKeyword,
  });

  useEffect(() => {
    if (!query.error) return;

    exceptionHandler(query.error, [401, 403, 418, 429, 500, 502, 504]);
  }, [query.error]);

  return {
    data: query.data,
  };
};
