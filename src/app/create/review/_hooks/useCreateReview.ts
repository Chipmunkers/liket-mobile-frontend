import axiosInstance from "@/shared/helpers/axios";
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
) =>
  useMutation({
    mutationFn: ({ idx, ...remains }) => {
      return axiosInstance.post(`/apis/culture-content/${idx}/review`, remains);
    },
    ...props,
  });
