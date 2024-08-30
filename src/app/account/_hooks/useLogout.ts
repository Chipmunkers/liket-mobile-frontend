import axiosInstance from "@/shared/helpers/axios";
import { useExceptionHandler } from "@/shared/hooks/useExceptionHandler";
import { MutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useLogout = (option: MutationOptions<void, AxiosError>) => {
  const exceptionHandler = useExceptionHandler();

  const mutate = useMutation<void, AxiosError>({
    mutationFn: async () => {
      await axiosInstance.delete("/apis/auth");
    },
    onError: (err) => {
      exceptionHandler(err, []);
    },
    ...option,
  });

  return mutate;
};
