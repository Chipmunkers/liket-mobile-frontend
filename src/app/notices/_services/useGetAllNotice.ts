import { useInfiniteQuery } from "@tanstack/react-query";
import axiosInstance from "@/shared/helpers/axios";
import { SummaryNoticeEntity } from "@/shared/types/api/notice/SummaryNoticeEntity";

export const useGetAllNotice = () =>
  useInfiniteQuery({
    queryKey: [`notice`],
    queryFn: async ({ pageParam = 1 }) => {
      const { data } = await axiosInstance.get<{
        noticeList: SummaryNoticeEntity[];
      }>(`/apis/notice/all?` + `page=${pageParam}`);

      return {
        noticeList: data.noticeList,
        nextPage: data.noticeList.length > 0 ? pageParam + 1 : undefined,
        isLastPage: data.noticeList.length === 0,
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
