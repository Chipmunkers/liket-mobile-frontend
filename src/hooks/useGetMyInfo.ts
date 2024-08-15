import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/utils/axios";
import { UserEntity } from "../types/api/user";
import { ResponseError } from "@/types/api";

export const useGetMyInfo = () =>
  useQuery<UserEntity, ResponseError>({
    queryKey: ["get-my-info-for-login"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/apis/user/login");

      return data;
    },
    staleTime: 0,
    refetchOnWindowFocus: false,
  });
