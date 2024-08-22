import axiosInstance from "@/shared/helpers/axios";
import { SummaryTosEntity } from "@/shared/types/api/terms-of-service/SummaryTosEntity";
import { useQuery } from "@tanstack/react-query";

export const useGetTosAll = () =>
  useQuery({
    queryKey: ["get-tos-all"],
    queryFn: async () => {
      const { data } = await axiosInstance.get<{ tosList: SummaryTosEntity[] }>(
        "/apis/tos/all"
      );

      return data;
    },
  });
