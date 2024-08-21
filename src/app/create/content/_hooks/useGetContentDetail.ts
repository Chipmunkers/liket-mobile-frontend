import { ResponseError } from "@/types/api";
import { ContentEntity } from "@/types/api/culture-content";
import axiosInstance from "@/shared/helpers/axios";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export const useGetContentDetail = (
  props: UseQueryOptions<ContentEntity, ResponseError> & {
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
