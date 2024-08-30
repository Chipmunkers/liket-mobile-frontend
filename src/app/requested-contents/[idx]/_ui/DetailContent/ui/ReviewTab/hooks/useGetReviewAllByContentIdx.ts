import { useInfiniteQuery } from "@tanstack/react-query";
import axiosInstance from "@/shared/helpers/axios";
import { ReviewEntity } from "@/shared/types/api/review/ReviewEntity";
import { useEffect, useState } from "react";
import { useExceptionHandler } from "@/shared/hooks/useExceptionHandler";
import { AxiosError } from "axios";

export const useGetReviewAllByContentIdx = (
  idx: string,
  option: {
    order?: "desc" | "asc";
    orderby?: "time" | "like";
    review: string | null;
  }
) => {
  const [target, setTarget] = useState<HTMLDivElement | null>(null);
  const exceptionHandler = useExceptionHandler();

  const query = useInfiniteQuery({
    queryKey: [`content-review-${idx}`, option],
    queryFn: async ({ pageParam = 1 }) => {
      const { data } = await axiosInstance.get<{ reviewList: ReviewEntity[] }>(
        `/apis/review/all?content=${idx}&` +
          (option?.order ? `order=${option.order}&` : ``) +
          (option?.orderby ? `orderby=${option.orderby}&` : ``) +
          (option.review ? `review=${option.review}&` : ``) +
          `page=${pageParam}`
      );

      return {
        reviewList: data.reviewList,
        nextPage: data.reviewList.length > 0 ? pageParam + 1 : undefined, // 다음 페이지 번호 계산
        isLastPage: data.reviewList.length === 0, // 마지막 페이지 여부 체크
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

    exceptionHandler(query.error as AxiosError, []);
  }, [query.error]);

  return { ...query, setTarget };
};
