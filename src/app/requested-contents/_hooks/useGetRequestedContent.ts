import axiosInstance from "@/shared/helpers/axios";
import { ContentEntity } from "@/shared/types/api/content/ContentEntity";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useGetRequestedContent = (idx: number | undefined) => {
  const res = useInfiniteQuery({
    queryKey: ["requested-contents", idx],
    queryFn: async ({ pageParam = 1 }) => {
      const { data } = await axiosInstance.get<{
        contentList: ContentEntity[];
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

  return {
    ...res,
    contentListToShow: res.data?.pages.flat(),
  };
};
