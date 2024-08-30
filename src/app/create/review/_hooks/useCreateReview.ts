import axiosInstance from "@/shared/helpers/axios";
import { useExceptionHandler } from "@/shared/hooks/useExceptionHandler";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

export const useCreateReview = (
  props: UseMutationOptions<
    AxiosResponse,
    AxiosError,
    {
      idx: number;
      imgList: string[];
      description: string;
      starRating: number;
      visitTime: string;
    }
  >
) => {
  const exceptionHandler = useExceptionHandler();

  return useMutation({
    mutationFn: ({ idx, ...remains }) => {
      return axiosInstance.post(`/apis/culture-content/${idx}/review`, remains);
    },
    onError(err) {
      exceptionHandler(err, [401, 418]);
    },
    ...props,
  });
};
