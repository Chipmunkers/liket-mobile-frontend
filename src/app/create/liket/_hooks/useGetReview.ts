import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/shared/helpers/axios";
import { ReviewEntity } from "@/shared/types/api/review/ReviewEntity";

export const useGetReview = (idx: number) =>
  useQuery({
    queryKey: [`review-${idx}`],
    queryFn: async () => {
      const { data } = await axiosInstance.get<ReviewEntity>(
        `/apis/review/${idx}`
      );

      return data;
    },
    staleTime: 0,
    refetchOnWindowFocus: false,
  });
