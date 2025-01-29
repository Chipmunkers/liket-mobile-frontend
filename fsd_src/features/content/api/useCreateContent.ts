import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { UpsertContentDto } from "../../../shared/api/dto/UpsertContentDto";
import { useExceptionHandler } from "../../../shared/hook/useExceptionHandler";
import axiosInstance from "../../../shared/helper/axiosInstance";

export const useCreateContent = (
  props: UseMutationOptions<AxiosResponse, AxiosError, UpsertContentDto>
) => {
  const exceptionHandler = useExceptionHandler();

  return useMutation<AxiosResponse, AxiosError, UpsertContentDto>({
    mutationFn: (param) =>
      axiosInstance.post("/apis/culture-content/request", param),
    ...props,
    onError: (err) => {
      exceptionHandler(err, [401]);
    },
  });
};
