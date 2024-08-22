import axiosInstance from "@/shared/helpers/axios";
import { MutationOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { MyInfoEntity } from "@/shared/types/api/user/MyInfoEntity";

export const useGetMyInfo = (
  options: MutationOptions<MyInfoEntity, AxiosError>
) =>
  useQuery<MyInfoEntity, AxiosError>({
    queryKey: ["mypage"],
    queryFn: async () => {
      const { data } = await axiosInstance.get<MyInfoEntity>("/apis/user/my");

      return data;
    },
    ...options,
  });
