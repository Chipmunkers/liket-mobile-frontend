import { WEBVIEW_SCREEN } from "@/shared/consts/webview/screen";
import axiosInstance from "@/shared/helpers/axios";
import customToast from "@/shared/helpers/customToast";
import { stackRouterPush } from "@/shared/helpers/stackRouter";
import { LocationEntity } from "@/shared/types/api/content/LocationEntity";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/navigation";

interface UpdateContentDto {
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

export const useEditContent = ({
  idx,
  onSuccess,
}: UseMutationOptions<AxiosResponse, AxiosError, UpdateContentDto> & {
  idx: number;
}) => {
  const router = useRouter();

  return useMutation<AxiosResponse, AxiosError, UpdateContentDto>({
    mutationFn: (param) => {
      return axiosInstance.put(`/apis/culture-content/request/${idx}`, param);
    },
    onSuccess: () => {
      stackRouterPush(router, {
        path: `/requested-contents/${idx}`,
        screen: WEBVIEW_SCREEN.REQUESTED_CONTENT_DETAIL,
        isStack: false,
      });
    },
    onError: (err) => {
      const statusCode = err.response?.status;

      if (statusCode === 401) {
        stackRouterPush(router, {
          path: "/login?isTokenExpired=true",
          screen: WEBVIEW_SCREEN.LOGIN,
          isStack: false,
        });
        return;
      }

      if (statusCode === 409) {
        return customToast(
          "활성화된 컨텐츠는 수정할 수 없습니다.\n문의주시기 바랍니다."
        );
      }

      return customToast("예상하지 못한 에러가 발생했습니다.");
    },
  });
};
