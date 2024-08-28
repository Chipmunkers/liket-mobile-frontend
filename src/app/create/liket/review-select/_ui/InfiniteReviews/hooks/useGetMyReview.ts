import { QueryKey, useInfiniteQuery } from "@tanstack/react-query";
import axiosInstance from "@/shared/helpers/axios";
import { ReviewEntity } from "@/shared/types/api/review/ReviewEntity";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { stackRouterPush } from "@/shared/helpers/stackRouter";
import { WEBVIEW_SCREEN } from "@/shared/consts/webview/screen";
import customToast from "@/shared/helpers/customToast";

/**
 * 무한 리뷰 목록 불러오기
 *
 * @param idx 사용자 인덱스
 */
export const useGetMyReviews = (idx: number) => {
  const router = useRouter();
  const searchParam = useSearchParams();

  const order = searchParam.get("order") || "desc";

  const query = useInfiniteQuery({
    queryKey: [`user-review-${idx}`, order],
    queryFn: async ({ pageParam = 1 }) => {
      const { data } = await axiosInstance.get<{ reviewList: ReviewEntity[] }>(
        `/apis/review/all?user=${idx}&` +
          `order=${order}&` +
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

    const statusCode = (query.error as AxiosError).response?.status;

    if (statusCode === 401) {
      stackRouterPush(router, {
        path: "/login?isTokenExpired=true",
        screen: WEBVIEW_SCREEN.LOGIN,
        isStack: false,
      });
      return;
    }

    if (statusCode === 403) {
      // TODO: 잘못된 접근입니다 페이지로 넘겨야함
      stackRouterPush(router, {
        path: "/error",
        screen: WEBVIEW_SCREEN.ERROR,
      });
      return;
    }

    customToast("예상하지 못한 에러가 발생헀습니다.");
  }, [query.error]);

  return { ...query, setTarget };
};
