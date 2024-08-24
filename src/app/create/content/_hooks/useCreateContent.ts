import axiosInstance from "@/shared/helpers/axios";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { LocationEntity } from "@/shared/types/api/content/LocationEntity";
import { useRouter } from "next/navigation";
import { stackRouterPush } from "@/shared/helpers/stackRouter";
import { WEBVIEW_SCREEN } from "@/shared/consts/webview/screen";
import customToast from "@/shared/helpers/customToast";

interface CreateContentRequestDto {
  imgList: string[];
  genreIdx: number;
  ageIdx: number;
  styleIdxList: number[];
  title: string;
  location: LocationEntity;
  description: string;
  websiteLink: string;
  startDate: string;
  endDate: string;
  openTime: string;
  isFee: boolean;
  isReservation: boolean;
  isPet: boolean;
  isParking: boolean;
}

export const useCreateContent = (
  props: UseMutationOptions<AxiosResponse, AxiosError, CreateContentRequestDto>
) => {
  const router = useRouter();

  return useMutation<AxiosResponse, AxiosError, CreateContentRequestDto>({
    mutationFn: (param) =>
      axiosInstance.post("/apis/culture-content/request", param),
    ...props,
    onError: (err) => {
      if (err.response?.status === 401) {
        stackRouterPush(router, {
          path: "/login?isTokenExpired=true",
          screen: WEBVIEW_SCREEN.LOGIN,
        });
        return;
      }

      customToast("예상하지 못한 에러가 발생했습니다. 다시 시도해주세요.");
    },
  });
};
