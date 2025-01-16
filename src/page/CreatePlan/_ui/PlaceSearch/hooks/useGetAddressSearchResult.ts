import axiosInstance from "@/shared/helpers/axios";
import { useExceptionHandler } from "@/shared/hooks/useExceptionHandler";
import { KeywordSearchResultEntity } from "@/shared/types/api/address/KeywordSearchResultEntity";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect } from "react";

export const useGetAddressSearchResult = (
  searchKeyword: string | undefined
) => {
  const exceptionHandler = useExceptionHandler();

  const query = useQuery<KeywordSearchResultEntity, AxiosError>({
    queryKey: ["address-keyword-search", searchKeyword],
    queryFn: async () => {
      const { data } = await axiosInstance.get<KeywordSearchResultEntity>(
        "/apis/address/keyword-search/all",
        {
          params: {
            search: searchKeyword,
          },
        }
      );

      return data;
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
