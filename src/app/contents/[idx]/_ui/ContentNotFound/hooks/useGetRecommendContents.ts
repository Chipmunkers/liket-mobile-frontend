import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/shared/helpers/axios";
import { SummaryContentEntity } from "@/shared/types/api/content/SummaryContentEntity";

export const useGetRecommendContents = () =>
  useQuery({
    queryKey: ["soon-end-content"],
    queryFn: async () => {
      const { data } = await axiosInstance.get<{
        contentList: SummaryContentEntity[];
      }>("/apis/culture-content/hot-style/all", {
        headers: {
          "Cache-Control": "no-cache",
        },
      });

      return data;
    },
    staleTime: 0,
  });
