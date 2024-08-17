import { useInfiniteQuery } from "@tanstack/react-query";
import axiosInstance from "@/utils/axios";
import { SummaryContentEntity } from "../../../types/api/culture-content";

export const GET_CONTENT_ALL_KEY = "content-search-key";

export const useGetContentAll = (querystring: string) =>
  useInfiniteQuery({
    queryKey: [GET_CONTENT_ALL_KEY, querystring],
    queryFn: async ({ pageParam = 1 }) => {
      const { data } = await axiosInstance.get<{
        contentList: SummaryContentEntity[];
      }>(
        `/apis/culture-content/all?accept=true&page=${pageParam}&` + querystring
      );

      return {
        contentList: data.contentList,
        nextPage: data.contentList.length > 0 ? pageParam + 1 : undefined, // 다음 페이지 번호 계산
        isLastPage: data.contentList.length === 0, // 마지막 페이지 여부 체크
      };
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      // 마지막 페이지 여부에 따라 다음 페이지 파라미터를 반환
      return lastPage.nextPage;
    },
    staleTime: 0,
    retry: 0,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
