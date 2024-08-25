import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/shared/helpers/axios";
import { ContentEntity } from "@/shared/types/api/content/ContentEntity";
import { AxiosError } from "axios";

export const useGetCultureContentByIdx = (idx: number) =>
  useQuery<ContentEntity, AxiosError>({
    queryKey: [`requested-culture-content-${idx}`],
    queryFn: async () => {
      const { data } = await axiosInstance.get<ContentEntity>(
        `/apis/culture-content/${idx}`
      );

      return data;
    },
    staleTime: 0,
    refetchOnWindowFocus: false,
  });
