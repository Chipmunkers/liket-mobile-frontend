import { ResponseError } from "@/types/api";
import axiosInstance from "@/shared/helpers/axios";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { LocationEntity } from "@/shared/types/api/content/LocationEntity";

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
  props: UseMutationOptions<
    AxiosResponse,
    ResponseError,
    CreateContentRequestDto
  >
) =>
  useMutation({
    mutationFn: (param) =>
      axiosInstance.post("/apis/culture-content/request", param),
    ...props,
  });
