import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import axiosInstance from "@/shared/helpers/axios";
import { useExceptionHandler } from "@/shared/hooks/useExceptionHandler";
import { AxiosError, AxiosResponse } from "axios";
import { CreateLiketDto } from "../models/types.tsx/dto/CreateLiketDto";

const useEditLiket = (
  id: string,
  props: UseMutationOptions<AxiosResponse, AxiosError, CreateLiketDto>
) => {
  const exceptionHandler = useExceptionHandler();

  return useMutation({
    mutationFn: async (param) => {
      return await axiosInstance.put(`/apis/liket/${id}`, param);
    },
    onError: (err) => {
      exceptionHandler(err, [401]);
    },
    ...props,
  });
};

export default useEditLiket;
