import { useInfiniteQuery } from "@tanstack/react-query";
import axiosInstance from "@/shared/helpers/axios";
import { SummaryContentEntity } from "@/shared/types/api/content/SummaryContentEntity";
import { GenreEntity } from "@/shared/types/api/tag/GenreEntity";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { useExceptionHandler } from "@/shared/hooks/useExceptionHandler";

export const useGetLikeContent = (option: {
  onlyopen: boolean;
  genre?: GenreEntity;
}) => {
  const exceptionHandler = useExceptionHandler();

  const query = useInfiniteQuery({
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

  const [target, setTarget] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !query.isFetching && !query.error) {
          query.fetchNextPage();
        }
      },
      { threshold: 1 }
    );

    observer.observe(target);
    return () => {
      observer.unobserve(target);
    };
  }, [target, query.hasNextPage, query.isFetching]);

  useEffect(() => {
    if (!query.error) return;

    if (!(query.error instanceof AxiosError)) return;

    exceptionHandler(query.error, [401, 418]);
  }, [query.error]);

  return { ...query, setTarget };
};
