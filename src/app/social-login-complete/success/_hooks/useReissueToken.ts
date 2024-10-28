import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import axiosInstance from "@/shared/helpers/axios";
import { useExceptionHandler } from "@/shared/hooks/useExceptionHandler";

export const useReissueToken = (
  props: UseMutationOptions<string, AxiosError, string>
) => {
  const exceptionHandler = useExceptionHandler();

  return useMutation({
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
    onError(err) {
      exceptionHandler(err, [500, 502, 504]);
    },
    ...props,
  });
};
