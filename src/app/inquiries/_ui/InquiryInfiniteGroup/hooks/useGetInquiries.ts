import { useInfiniteQuery } from "@tanstack/react-query";
import axiosInstance from "@/shared/helpers/axios";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { SummaryInquiryEntity } from "@/shared/types/api/inquiry/SummaryInquiry";
import { useExceptionHandler } from "@/shared/hooks/useExceptionHandler";

export const useGetInquiries = () => {
  const router = useRouter();
  const exceptionHandler = useExceptionHandler();
  const [target, setTarget] = useState<HTMLDivElement | null>(null);

  const query = useInfiniteQuery({
    queryKey: ["all-inquiry"],
    queryFn: async ({ pageParam = 1 }) => {
      const { data } = await axiosInstance.get<{
        inquiryList: SummaryInquiryEntity[];
      }>(`/apis/inquiry/all?` + `page=${pageParam}`);

      return {
        inquiryList: data.inquiryList,
        nextPage: data.inquiryList.length > 0 ? pageParam + 1 : undefined,
        isLastPage: data.inquiryList.length === 0,
      };
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.nextPage;
    },
    staleTime: 0,
    retry: 0,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  useEffect(() => {
    if (!query.error) return;

    if (!(query.error instanceof AxiosError)) return;

    const statusCode = query.error.response?.status;

    exceptionHandler(query.error, [401]);
  }, [query.error]);

  // * 무한 스크롤 타겟팅
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

  return { ...query, setTarget };
};
