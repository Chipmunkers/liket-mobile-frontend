import { MutationOptions, useMutation } from "@tanstack/react-query";
import axiosInstance from "@/shared/helpers/axios";
import { useExceptionHandler } from "@/shared/hooks/useExceptionHandler";
import { AxiosError } from "axios";
import customToast from "@/shared/helpers/customToast";
import { SetState } from "@/shared/types/react";

export const useLikeReview = (
  idx: number | string,
  mutationOption: MutationOptions<void, AxiosError>,
  setLike: SetState<boolean>,
  setLikeCount: SetState<number>
) => {
  const exceptionHandler = useExceptionHandler();

  return useMutation<void, AxiosError>({
    mutationFn: async () => {
      await axiosInstance.post(`/apis/review/${idx}/like`);
      return;
    },
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
            setLike(true);
            setLikeCount((likeCount) => likeCount + 1);
          },
        },
      ]);
    },
    ...mutationOption,
  });
};
