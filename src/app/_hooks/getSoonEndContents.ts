import { SummaryContentEntity } from "@/types/api/culture-content";
import customFetch from "@/utils/fetch";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/utils/axios";

export const getSoonEndContentsForServer = async (): Promise<{
  contentList: SummaryContentEntity[];
}> =>
  (
    await customFetch(`/culture-content/soon-end/all`, {
      next: {
        revalidate: 60,
      },
    })
  ).json();

export const useGetSoonEndContent = (initialData: {
  contentList: SummaryContentEntity[];
}) =>
  useQuery({
    queryKey: ["soon-end-content"],
    queryFn: async () => {
      const { data } = await axiosInstance.get<{
        contentList: SummaryContentEntity[];
      }>("/apis/culture-content/soon-end/all", {
        headers: {
          "Cache-Control": "no-cache",
        },
      });

      return data;
    },
    initialData,
    staleTime: 0,
  });
