import { useQuery } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import axiosInstance from "../../shared/helpers/axios";

export const useClusteredMap = () =>
  useQuery<AxiosResponse<any>, AxiosError, any>({
    queryKey: ["clustered-map"],
    queryFn: async () => {
      const { data } = await axiosInstance.get(
        "/apis/map/culture-content/clustered/all"
      );
      return data;
    },
  });
