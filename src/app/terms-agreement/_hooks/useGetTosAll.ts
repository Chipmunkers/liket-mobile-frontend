import axiosInstance from "@/shared/helpers/axios";
import { useExceptionHandler } from "@/shared/hooks/useExceptionHandler";
import { SummaryTosEntity } from "@/shared/types/api/terms-of-service/SummaryTosEntity";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect } from "react";

export const useGetTosAll = () => {
  const exceptionHandler = useExceptionHandler();

  const query = useQuery<{ tosList: SummaryTosEntity[] }, AxiosError>({
    queryKey: ["get-tos-all"],
    queryFn: async () => {
      const { data } = await axiosInstance.get<{ tosList: SummaryTosEntity[] }>(
        "/apis/tos/all"
      );

      return data;
    },
  });

  useEffect(() => {
    if (!query.error) return;

    exceptionHandler(query.error, [500, 502, 504]);
  }, [query.error]);

  return query;
};
