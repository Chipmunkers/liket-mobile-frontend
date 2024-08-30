import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/shared/helpers/axios";
import customFetch from "@/shared/helpers/fetch";
import { SummaryContentEntity } from "@/shared/types/api/content/SummaryContentEntity";
import { AxiosError } from "axios";

export const getSoonEndContentsForServer = async (): Promise<{
  contentList: SummaryContentEntity[];
}> =>
  (
    await customFetch(`/culture-content/soon-end/all`, {
      next: {
        revalidate: 0,
      },
    })
  ).json();

export const useGetSoonEndContent = (initialData: {
  contentList: SummaryContentEntity[];
}) =>
  useQuery<
    {
      contentList: SummaryContentEntity[];
    },
    AxiosError
  >({
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
