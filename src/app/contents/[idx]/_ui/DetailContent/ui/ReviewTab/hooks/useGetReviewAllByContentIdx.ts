import { useInfiniteQuery } from "@tanstack/react-query";
import axiosInstance from "@/shared/helpers/axios";
import { ReviewEntity } from "@/shared/types/api/review/ReviewEntity";

export const useGetReviewAllByContentIdx = (
  idx: string,
  option: {
    order?: "desc" | "asc";
    orderby?: "time" | "like";
    review: string | null;
  }
) =>
  useInfiniteQuery({
    queryKey: [`content-review-${idx}`, option],
    queryFn: async ({ pageParam = 1 }) => {
      const { data } = await axiosInstance.get<{ reviewList: ReviewEntity[] }>(
        `/apis/review/all?content=${idx}&` +
          (option?.order ? `order=${option.order}&` : ``) +
          (option?.orderby ? `orderby=${option.orderby}&` : ``) +
          (option.review ? `review=${option.review}&` : ``) +
          `page=${pageParam}`
      );

      return {
        reviewList: data.reviewList,
        nextPage: data.reviewList.length > 0 ? pageParam + 1 : undefined, // 다음 페이지 번호 계산
        isLastPage: data.reviewList.length === 0, // 마지막 페이지 여부 체크
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
