import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/shared/helpers/axios";
import { SummaryContentEntity } from "@/shared/types/api/content/SummaryContentEntity";
import { useEffect } from "react";
import { useExceptionHandler } from "@/shared/hooks/useExceptionHandler";
import { AxiosError } from "axios";

export const useGetRecommendContents = () => {
  const exceptionHandler = useExceptionHandler();

  const query = useQuery<{ contentList: SummaryContentEntity[] }, AxiosError>({
    queryKey: ["soon-end-content"],
    queryFn: async () => {
      const { data } = await axiosInstance.get<{
        contentList: SummaryContentEntity[];
      }>("/apis/culture-content/hot-style/all", {
        headers: {
          "Cache-Control": "no-cache",
        },
      });

      return data;
    },
    staleTime: 0,
  });

  useEffect(() => {
    if (!query.error) return;

    exceptionHandler(query.error, [418, 429, 500, 502, 504]);
  }, [query.error]);

  return query;
};
