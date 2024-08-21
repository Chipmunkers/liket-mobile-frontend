import { useInfiniteQuery } from "@tanstack/react-query";
import axiosInstance from "@/utils/axios";
import { SummaryContentEntity } from "../../../types/api/culture-content";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import customToast from "@/shared/helpers/customToast";
import { stackRouterBack, stackRouterPush } from "@/shared/helpers/stackRouter";
import { WEBVIEW_SCREEN } from "@/shared/consts/webview/screen";
import useModalStore from "@/shared/store/modalStore";

export const GET_CONTENT_ALL_KEY = "content-search-key";

export const useGetContentAll = (querystring: string) => {
  const router = useRouter();
  const [target, setTarget] = useState<HTMLDivElement | null>(null);
  const openModal = useModalStore(({ openModal }) => openModal);

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

    if (error instanceof AxiosError) {
      if (error.response?.status === 401) {
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
        return;
      }
    }

    customToast("에러가 발생했습니다. 다시 시도해주세요.");
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
