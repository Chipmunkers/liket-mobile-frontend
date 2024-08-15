import { ResponseError } from "@/types/api";
import axiosInstance from "@/utils/axios";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

export const useRemoveContent = ({
  idx,
  onSuccess,
  onError,
}: UseMutationOptions<AxiosResponse, ResponseError> & {
  idx: number;
}) =>
  useMutation({
    mutationFn: (param) => {
      return axiosInstance.put(`/apis/culture-content/request/${idx}`, param);
    },
    onSuccess,
    onError,
  });

// accept를 안주면 섞여서
// true를 주면 활성화 된것만
// false면 활성화 안된것만
// 사용자 idx
// 로그인 확인
