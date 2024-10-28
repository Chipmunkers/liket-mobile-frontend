import { MutationOptions, useMutation } from "@tanstack/react-query";
import axiosInstance from "@/shared/helpers/axios";
import { AxiosError } from "axios";
import { useExceptionHandler } from "@/shared/hooks/useExceptionHandler";
import customToast from "@/shared/helpers/customToast";
import { SetState } from "@/shared/types/react";

export const useCancelLikeReview = (
  idx: number | string,
  mutationOption: MutationOptions<unknown, AxiosError>,
  setLike: SetState<boolean>,
  setLikeCount: SetState<number>
) => {
  const exceptionHandler = useExceptionHandler();

  return useMutation<unknown, AxiosError>({
    mutationFn: () => axiosInstance.delete(`/apis/review/${idx}/like`),
    onError(err) {
      exceptionHandler(err, [
        {
          statusCode: 401,
          handler() {
            customToast("로그인 후 사용할 수 있습니다.");
          },
        },
        {
          statusCode: 404,
          handler() {},
        },
        {
          statusCode: 409,
          handler() {
            setLikeCount((count) => count - 1);
            setLike(false);
          },
        },
      ]);
    },
    ...mutationOption,
  });
};
