import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import axiosInstance from "@/shared/helpers/axios";

export const useReissueToken = (
  props: UseMutationOptions<string, AxiosError, string>
) =>
  useMutation({
    mutationFn: async (refreshToken) => {
      const { data } = await axiosInstance.post<string>(
        "/apis/auth/access-token",
        { refreshToken },
        {
          withCredentials: true,
        }
      );

      return data;
    },
    ...props,
  });
