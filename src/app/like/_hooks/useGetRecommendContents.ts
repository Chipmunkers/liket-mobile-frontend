import { useQuery } from "@tanstack/react-query";
import { SummaryContentEntity } from "@/types/api/culture-content";
import axiosInstance from "@/shared/helpers/axios";

export const useGetRecommendContents = () =>
  useQuery({
    queryKey: ["soon-end-content"],
    queryFn: async () => {
      const { data } = await axiosInstance.get<{
        contentList: SummaryContentEntity[];
      }>("/apis/culture-content/hot-random-style/all", {
        headers: {
          "Cache-Control": "no-cache",
        },
      });

      return data;
    },
    staleTime: 0,
  });
