import axiosInstance from "@/shared/helpers/axios";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useSearchContent = (searchText: string) => {
  const res = useInfiniteQuery({
    queryKey: ["search", searchText],
    initialPageParam: 0,
    enabled: !!searchText.length,
    queryFn: async () => {
      const { data } = await axiosInstance.get(
        `/apis/culture-content/all?accept=true&search=${searchText}`
      );

      return data.contentList;
    },
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length === 10) {
        return pages.length + 1;
      } else {
        return undefined;
      }
    },
  });

  return {
    ...res,
    contentListToShow: res.data?.pages.flat(),
  };
};
