import { ContentEntity } from "@/types/api/culture-content";
import axiosInstance from "@/utils/axios";
import { skipToken, useInfiniteQuery } from "@tanstack/react-query";

export const useGetContents = (idx: number | undefined) => {
  const res = useInfiniteQuery({
    queryKey: ["requested-contents", idx],
    queryFn: async ({ pageParam = 1 }) => {
      const { data } = await axiosInstance.get(
        `/apis/culture-content/all?user=${idx}&page=${pageParam}`
      );

      return data.contentList;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length === 10) {
        return pages.length + 1;
      } else {
        return undefined;
      }
    },
    staleTime: 0,
    retry: 0,
  });

  return {
    ...res,
    contentListToShow: res.data?.pages.flat(),
  };
};
