import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/shared/helpers/axios";
import customFetch from "@/shared/helpers/fetch";
import { SummaryContentEntity } from "@/shared/types/api/content/SummaryContentEntity";

export const getSoonOpenContentsForServer = async (): Promise<{
  contentList: SummaryContentEntity[];
}> =>
  (
    await customFetch(`/culture-content/soon-open/all`, {
      next: {
        revalidate: 0,
      },
    })
  ).json();

export const useGetSoonOpenContent = (initialData: {
  contentList: SummaryContentEntity[];
}) =>
  useQuery({
    queryKey: ["soon-open-content"],
    queryFn: async () => {
      const { data } = await axiosInstance.get<{
        contentList: SummaryContentEntity[];
      }>("/apis/culture-content/soon-open/all", {
        headers: {
          "Cache-Control": "no-cache",
        },
      });

      return data;
    },
    initialData,
    staleTime: 0,
  });
