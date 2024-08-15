import {
  ContentEntity,
  SummaryContentEntity,
} from "@/types/api/culture-content";
import { StyleEntity } from "@/types/api/tag";
import axiosInstance from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";

export const useGetHotStyleContents = (idx: string | undefined) =>
  useQuery({
    queryKey: ["requested-content-detail", idx],
    queryFn: async () => {
      const { data } = await axiosInstance.get<ContentEntity>(
        "/apis/culture-content/" + idx
      );

      return data;
    },
  });
