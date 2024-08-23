import axiosInstance from "@/shared/helpers/axios";
import { TosEntity } from "@/shared/types/api/terms-of-service/TosEntity";
import { useQuery } from "@tanstack/react-query";

export const useGetTosByIdx = (idx: number) =>
  useQuery({
    queryKey: ["get_tos_by_idx"],
    queryFn: async () => {
      const { data } = await axiosInstance.get<TosEntity>(`/apis/tos/${idx}`);

      return data;
    },
  });
