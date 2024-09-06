import axiosInstance from "@/shared/helpers/axios";
import { useExceptionHandler } from "@/shared/hooks/useExceptionHandler";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useEditReview = (
  props: UseMutationOptions<
    number,
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
    mutationFn: async ({ idx, ...body }) => {
      await axiosInstance.put(`/apis/review/${idx}`, body);

      return idx;
    },
    onError(err) {
      // TODO: 수정해야함
      exceptionHandler(err, [401, 418]);
    },
    ...props,
  });
};
