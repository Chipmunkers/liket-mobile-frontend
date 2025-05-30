import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/shared/helpers/axios";
import { UserEntity } from "@/shared/types/api/user/UserEntity";
import { AxiosError } from "axios";

export const USE_GET_MY_INFO_QUERY_KEY = "USE_GET_MY_INFO_QUERY_KEY";

export const useGetMyInfo = () =>
  useQuery<UserEntity, AxiosError>({
    queryKey: [USE_GET_MY_INFO_QUERY_KEY],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/apis/user/login");

      return data;
    },
    staleTime: 0,
    refetchOnWindowFocus: false,
  });
