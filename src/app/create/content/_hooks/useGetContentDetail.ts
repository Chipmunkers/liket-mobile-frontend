import axiosInstance from "@/shared/helpers/axios";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { ContentEntity } from "@/shared/types/api/content/ContentEntity";

export const useGetContentDetail = (
  props: UseQueryOptions<ContentEntity> & {
    idx: string | null;
  }
) => {
  const { idx, ...remains } = props;

  return useQuery({
    queryFn: async () => {
      const { data } = await axiosInstance.get("/apis/culture-content/" + idx);

      return data;
    },
    ...remains,
    staleTime: 0,
  });
};
