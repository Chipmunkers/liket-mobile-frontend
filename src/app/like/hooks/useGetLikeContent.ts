import { useInfiniteQuery } from "@tanstack/react-query";
import axiosInstance from "@/utils/axios";
import { SummaryContentEntity } from "@/types/api/culture-content";
import { Genre } from "@/types/content";

export const useGetLikeContent = (option: {
  onlyopen: boolean;
  genre?: Genre;
}) =>
  useInfiniteQuery({
    queryKey: [`like-content-all`, option],
    queryFn: async ({ pageParam = 1 }) => {
      const { data } = await axiosInstance.get<{
        contentList: SummaryContentEntity[];
      }>(
        `/apis/culture-content/like/all?` +
          `page=${pageParam}&` +
          `onlyopen=${option.onlyopen}&` +
          (option.genre ? `genre=${option.genre.idx}` : "")
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
