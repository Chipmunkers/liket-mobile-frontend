import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/shared/helpers/axios";
import { ContentEntity } from "@/shared/types/api/content/ContentEntity";

export const useGetReview = (idx: number) =>
  useQuery({
    queryKey: [`review-${idx}`],
    queryFn: async () => {
      const { data } = await axiosInstance.get<ContentEntity>(
        `/apis/review/${idx}`
      );

      return data;
    },
    staleTime: 0,
    refetchOnWindowFocus: false,
  });
