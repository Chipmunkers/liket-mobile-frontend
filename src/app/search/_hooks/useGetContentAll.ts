import { useInfiniteQuery } from "@tanstack/react-query";
import axiosInstance from "@/shared/helpers/axios";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import customToast from "@/shared/helpers/customToast";
import { stackRouterBack, stackRouterPush } from "@/shared/helpers/stackRouter";
import { WEBVIEW_SCREEN } from "@/shared/consts/webview/screen";
import useModalStore from "@/shared/store/modalStore";
import { SummaryContentEntity } from "@/shared/types/api/content/SummaryContentEntity";
import { useExceptionHandler } from "@/shared/hooks/useExceptionHandler";

export const GET_CONTENT_ALL_KEY = "content-search-key";

export const useGetContentAll = (querystring: string) => {
  const router = useRouter();
  const [target, setTarget] = useState<HTMLDivElement | null>(null);
  const openModal = useModalStore(({ openModal }) => openModal);
  const exceptionHandler = useExceptionHandler();

  const { data, fetchNextPage, isFetching, refetch, error, hasNextPage } =
    useInfiniteQuery({
      queryKey: [GET_CONTENT_ALL_KEY, querystring],
      queryFn: async ({ pageParam = 1 }) => {
        const { data } = await axiosInstance.get<{
          contentList: SummaryContentEntity[];
        }>(
          `/apis/culture-content/all?accept=true&page=${pageParam}&` +
            querystring
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

  //* 에러 헨들링
  useEffect(() => {
    if (!error) return;

    exceptionHandler(error as AxiosError, [
      {
        statusCode: 401,
        handler() {
          openModal("LoginModal", {
            onClickPositive: () => {
              stackRouterPush(router, {
                path: "/login",
                screen: WEBVIEW_SCREEN.LOGIN,
                isStack: false,
              });
            },
            onClickNegative: () => {
              stackRouterBack(router);
            },
          });
        },
      },
    ]);
  }, [error]);

  // * 무한 스크롤 타겟팅
  useEffect(() => {
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isFetching && !error) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );

    observer.observe(target);
    return () => {
      observer.unobserve(target);
    };
  }, [target, hasNextPage, isFetching]);

  return {
    data,
    fetchNextPage,
    isFetching,
    refetch,
    error,
    hasNextPage,
    setTarget,
  };
};
