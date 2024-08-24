import { WEBVIEW_SCREEN } from "@/shared/consts/webview/screen";
import axiosInstance from "@/shared/helpers/axios";
import customToast from "@/shared/helpers/customToast";
import { stackRouterPush } from "@/shared/helpers/stackRouter";
import { SummaryContentEntity } from "@/shared/types/api/content/SummaryContentEntity";
import { useInfiniteQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const useGetRequestedContent = (idx: number | undefined) => {
  const router = useRouter();
  const [target, setTarget] = useState<HTMLDivElement | null>(null);

  const res = useInfiniteQuery({
    queryKey: ["requested-contents", idx],
    queryFn: async ({ pageParam = 1 }) => {
      if (!idx)
        return {
          contentList: [],
          nextPage: undefined, // 다음 페이지 번호 계산
          isLastPage: 0,
        };

      const { data } = await axiosInstance.get<{
        contentList: SummaryContentEntity[];
      }>(`/apis/culture-content/all?user=${idx}&page=${pageParam}`);

      return {
        contentList: data.contentList,
        nextPage: data.contentList.length > 0 ? pageParam + 1 : undefined, // 다음 페이지 번호 계산
        isLastPage: data.contentList.length === 0,
      };
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.nextPage;
    },
    staleTime: 0,
    retry: 0,
  });

  useEffect(() => {
    const error = res.error as AxiosError;

    if (!error) return;

    if (error.response?.status === 401) {
      stackRouterPush(router, {
        path: "/login?isTokenExpired=true",
        screen: WEBVIEW_SCREEN.LOGIN,
        isStack: false,
      });
      return;
    }

    console.log(error);

    customToast("예상하지 못한 에러가 발생했습니다. 다시 시도해주세요.");
  }, [res.error]);

  useEffect(() => {
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !res.isFetching && !res.error) {
          res.fetchNextPage();
        }
      },
      { threshold: 1 }
    );

    observer.observe(target);
    return () => {
      observer.unobserve(target);
    };
  }, [target, res.hasNextPage, res.isFetching]);

  return {
    ...res,
    setTarget,
  };
};
