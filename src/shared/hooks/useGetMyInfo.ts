import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/shared/helpers/axios";
import { ResponseError } from "@/types/api";
import { UserEntity } from "@/shared/types/api/user/UserEntity";

export const USE_GET_MY_INFO_QUERY_KEY = "USE_GET_MY_INFO_QUERY_KEY";

export const useGetMyInfo = () =>
  useQuery<UserEntity, ResponseError>({
    queryKey: [USE_GET_MY_INFO_QUERY_KEY],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/apis/user/login");

      return data;
    },
    staleTime: 0,
    refetchOnWindowFocus: false,
  });
