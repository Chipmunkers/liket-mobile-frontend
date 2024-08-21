import axiosInstance from "@/shared/helpers/axios";
import { useInfiniteQuery } from "@tanstack/react-query";
import { SummaryContentEntity } from "@/types/api/culture-content";
import { useEffect, useState } from "react";

export const GET_SEARCH_CONTENT_KEY_IN_CREATE_REVIEW_KEY =
  "SEARCH_CONTENT_IN_CREATE_REVIEW_KEY";

export const useGetSearchContents = (searchText: string) => {
  const infiniteQuery = useInfiniteQuery({
    queryKey: [GET_SEARCH_CONTENT_KEY_IN_CREATE_REVIEW_KEY, searchText],
    queryFn: async ({ pageParam = 1 }) => {
      if (searchText === "") {
        return {
          contentList: [],
          nextPage: undefined, // 다음 페이지 번호 계산
          isLastPage: 0, // 마지막 페이지 여부 체크
        };
      }

      const { data } = await axiosInstance.get<{
        contentList: SummaryContentEntity[];
      }>(
        `/apis/culture-content/all?accept=true&page=${pageParam}&search=` +
          searchText
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
        if (
          entry.isIntersecting &&
          !infiniteQuery.isFetching &&
          !infiniteQuery.error
        ) {
          infiniteQuery.fetchNextPage();
        }
      },
      { threshold: 1 }
    );

    observer.observe(target);
    return () => {
      observer.unobserve(target);
    };
  }, [target, infiniteQuery.hasNextPage, infiniteQuery.isFetching]);

  return {
    ...infiniteQuery,
    target,
    setTarget,
  };
};
