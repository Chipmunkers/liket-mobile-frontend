import { WEBVIEW_SCREEN } from "@/shared/consts/webview/screen";
import axiosInstance from "@/shared/helpers/axios";
import customToast from "@/shared/helpers/customToast";
import { stackRouterPush } from "@/shared/helpers/stackRouter";
import { useExceptionHandler } from "@/shared/hooks/useExceptionHandler";
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
  description: string | null;
  websiteLink: string | null;
  startDate: string;
  endDate: string | null;
  openTime: string | null;
  isFee: boolean;
  isReservation: boolean;
  isPet: boolean;
  isParking: boolean;
}

export const useEditContent = ({
  idx,
}: UseMutationOptions<AxiosResponse, AxiosError, UpdateContentDto> & {
  idx: number;
}) => {
  const exceptionHandler = useExceptionHandler();
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
      exceptionHandler(err, [
        401,
        {
          statusCode: 409,
          handler() {
            customToast(
              "활성화된 컨텐츠는 수정할 수 없습니다. 문의 주시기 바랍니다."
            );
          },
        },
      ]);
    },
  });
};
