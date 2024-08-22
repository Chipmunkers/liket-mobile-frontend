import axiosInstance from "@/shared/helpers/axios";
import { ContentEntity } from "@/shared/types/api/content/ContentEntity";
import { useQuery } from "@tanstack/react-query";

export const useGetContentDetail = (idx: string | undefined) =>
  useQuery({
    queryKey: ["requested-content-detail", idx],
    queryFn: async () => {
      const { data } = await axiosInstance.get<ContentEntity>(
        "/apis/culture-content/" + idx
      );

      return data;
    },
  });
