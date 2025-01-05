import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { CreateLiketPayload } from "../types";
import axiosInstance from "@/shared/helpers/axios";
import { useExceptionHandler } from "@/shared/hooks/useExceptionHandler";
import { AxiosError, AxiosResponse } from "axios";

const useCreateLiket = (
  reviewIdx: string,
  props: UseMutationOptions<AxiosResponse, AxiosError, CreateLiketPayload>
) => {
  const exceptionHandler = useExceptionHandler();

  return useMutation({
    mutationFn: async (param) => {
      return await axiosInstance.post(`/apis/review/${reviewIdx}/liket`, param);
    },
    onError: (err) => {
      exceptionHandler(err, [401]);
    },
    ...props,
  });
};

export default useCreateLiket;
