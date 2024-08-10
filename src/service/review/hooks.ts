import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../utils/axios";
import { ReviewEntity } from "../../types/api/review";

export const useGetReviewAllByContentIdx = (
  idx: string,
  option: {
    order?: "desc" | "asc";
    orderby?: "time" | "like";
    page: number;
  }
) =>
  useQuery({
    queryKey: [`content-review-${idx}`, option],
    queryFn: async () => {
      const { data } = await axiosInstance.get<{ reviewList: ReviewEntity[] }>(
        `/apis/review/all?content=${idx}&` +
          (option?.order ? `order=${option.order}&` : ``) +
          (option?.orderby ? `orderby=${option.orderby}&` : ``) +
          (option?.page ? `page=${option.page}&` : ``)
      );

      return data;
    },
  });
