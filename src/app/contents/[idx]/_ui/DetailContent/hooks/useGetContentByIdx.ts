import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/shared/helpers/axios";
import { ContentEntity } from "@/shared/types/api/content/ContentEntity";

export const useGetCultureContentByIdx = (
  idx: number,
  initialData: ContentEntity
) =>
  useQuery({
    queryKey: [`culture-content-${idx}`],
    queryFn: async () => {
      const { data } = await axiosInstance.get<ContentEntity>(
        `/apis/culture-content/${idx}`
      );

      return data;
    },
    initialData,
    staleTime: 0,
    refetchOnWindowFocus: false,
  });
