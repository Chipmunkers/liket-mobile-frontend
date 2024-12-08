import { useInfiniteQuery } from "@tanstack/react-query";
import axiosInstance from "@/shared/helpers/axios";
import { LiketEntity } from "@/shared/types/api/liket/LiketEntity";

export const useGetLiketAll = (
  idx: string,
  option: {
    order?: "desc" | "asc";
    orderby?: "time" | "like";
  }
) =>
  useInfiniteQuery({
    queryKey: [`content-liket-${idx}`, option],
    queryFn: async ({ pageParam = 1 }) => {
      const { data } = await axiosInstance.get<{ liketList: LiketEntity[] }>(
        `/apis/liket/all?user=${idx}&` +
          (option?.order ? `order=${option.order}&` : ``) +
          (option?.orderby ? `orderby=${option.orderby}&` : ``) +
          `page=${pageParam}`
      );

      return {
        liketList: data.liketList,
        nextPage: data.liketList.length > 0 ? pageParam + 1 : undefined,
        isLastPage: data.liketList.length === 0,
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
