import { useInfiniteQuery } from "@tanstack/react-query";
import axiosInstance from "@/shared/helpers/axios";
import { ReviewEntity } from "@/shared/types/api/review/ReviewEntity";

export const useGetInquiries = () =>
  useInfiniteQuery({
    queryKey: ["all-inquiry"],
    queryFn: async ({ pageParam = 1 }) => {
      const { data } = await axiosInstance.get<{
        inquiryList: ReviewEntity[];
        count: number;
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
