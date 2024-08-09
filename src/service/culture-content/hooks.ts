import { useQuery } from "@tanstack/react-query";
import { StyleEntity } from "../../types/api/tag";
import { SummaryContentEntity } from "../../types/api/culture-content";
import axiosInstance from "../../utils/axios";

export const useGetHotStyleContent = (initialData: {
  style: StyleEntity;
  contentList: SummaryContentEntity[];
}) =>
  useQuery({
    queryKey: ["hot-style-content"],
    queryFn: async () => {
      const { data } = await axiosInstance.get<{
        style: StyleEntity;
        contentList: SummaryContentEntity[];
      }>("/apis/culture-content/hot-style/all", {
        headers: {
          "Cache-Control": "no-cache",
        },
      });

      return data;
    },
    initialData,
  });
