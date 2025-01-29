import axiosInstance from "@/shared/helpers/axios";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { LocationEntity } from "@/shared/types/api/content/LocationEntity";
import { useExceptionHandler } from "@/shared/hooks/useExceptionHandler";

interface CreateContentRequestDto {
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

export const useCreateContent = (
  props: UseMutationOptions<AxiosResponse, AxiosError, CreateContentRequestDto>
) => {
  const exceptionHandler = useExceptionHandler();

  return useMutation<AxiosResponse, AxiosError, CreateContentRequestDto>({
    mutationFn: (param) =>
      axiosInstance.post("/apis/culture-content/request", param),
    ...props,
    onError: (err) => {
      exceptionHandler(err, [401]);
    },
  });
};
