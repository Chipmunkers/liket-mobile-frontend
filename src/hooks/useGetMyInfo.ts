import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/utils/axios";
import { UserEntity } from "../types/api/user";

export const useGetMyInfo = () =>
  useQuery({
    queryKey: ["get-my-info-for-login"],
    queryFn: async () => {
      const { data } = await axiosInstance.get<UserEntity>("/apis/user/login");

      return data;
    },
    staleTime: 0,
    refetchOnWindowFocus: false,
  });
