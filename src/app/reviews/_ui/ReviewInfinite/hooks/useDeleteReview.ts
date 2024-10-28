import { MutationOptions, useMutation } from "@tanstack/react-query";
import axiosInstance from "@/shared/helpers/axios";
import { AxiosError } from "axios";
import customToast from "@/shared/helpers/customToast";
import { useExceptionHandler } from "@/shared/hooks/useExceptionHandler";

export const useDeleteReview = (
  mutationOption: MutationOptions<void, AxiosError, number>
) => {
  const exceptionHandler = useExceptionHandler();

  const mutation = useMutation<void, AxiosError, number>({
    mutationFn: async (idx: number) => {
      await axiosInstance.delete(`/apis/review/${idx}`);

      return;
    },
    onError(err) {
      exceptionHandler(err, [
        401,
        {
          statusCode: 404,
          handler() {
            customToast("이미 삭제된 리뷰입니다.");
          },
        },
      ]);
    },
    ...mutationOption,
  });

  return mutation;
};
