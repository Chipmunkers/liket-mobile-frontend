import axiosInstance from "@/shared/helpers/axios";
import { useExceptionHandler } from "@/shared/hooks/useExceptionHandler";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useDeleteAccount = (
  props?: UseMutationOptions<
    unknown,
    AxiosError,
    {
      contents: string;
      type: number;
    }
  >
) => {
  const exceptionHandler = useExceptionHandler();

  return useMutation({
    mutationFn: (param) =>
      axiosInstance.delete("/apis/user", {
        data: param,
      }),
    onError(err) {
      exceptionHandler(err, [401]);
    },
    ...props,
  });
};
